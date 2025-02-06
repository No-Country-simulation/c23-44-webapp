import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-reading-practice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pronunciation-practice.component.html',
  styleUrls: ['./pronunciation-practice.component.css'],
})
export class ReadingPracticeComponent {
  books: any[] = [];
  currentBook: any;
  currentWordIndex: number = 0;
  words: string[] = [];
  isListening: boolean = false;
  transcript: string = '';
  mispronounced: string[] = [];
  score: number | null = null;
  error: string | null = null;
  trafficLight: 'red' | 'yellow' | 'green' = 'red';
  isPracticingWords: boolean = true;
  wordScores: { [key: string]: boolean } = {};

  private recognition: any;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
    this.initSpeechRecognition();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (books) => {
        this.books = books;
        if (this.books.length > 0) {
          this.setCurrentBook(this.books[0]);
        }
      },
      (error) => {
        console.error('Error loading books', error);
        this.error =
          'No se pudieron cargar los libros. Por favor, intenta de nuevo.';
      }
    );
  }

  setCurrentBook(book: any) {
    this.currentBook = book;
    this.words = this.currentBook.content.split(' ');
    this.resetPractice();
  }

  initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'es-ES';

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.transcript = transcript.toLowerCase();
        this.checkPronunciation();
      };

      this.recognition.onerror = (event: any) => {
        console.error('Error en el reconocimiento de voz', event.error);
        this.error =
          'Ups, algo salió mal con la escucha. ¿Intentamos de nuevo?';
        this.isListening = false;
        this.trafficLight = 'red';
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.trafficLight = 'red';
      };
    } else {
      this.error =
        'Oh no, parece que tu navegador no puede escuchar. ¿Probamos con otro?';
    }
  }

  startListening() {
    this.isListening = true;
    this.trafficLight = 'yellow';
    this.transcript = '';
    setTimeout(() => {
      this.trafficLight = 'green';
      this.recognition.start();
    }, 2000);
  }

  stopListening() {
    this.recognition.stop();
    this.isListening = false;
    this.trafficLight = 'red';
  }

  nextWord() {
    if (this.currentWordIndex < this.words.length - 1) {
      this.currentWordIndex++;
    } else if (this.isPracticingWords) {
      this.isPracticingWords = false;
      this.currentWordIndex = 0;
    }
  }

  previousWord() {
    if (this.currentWordIndex > 0) {
      this.currentWordIndex--;
    }
  }

  checkPronunciation() {
    if (this.isPracticingWords) {
      const currentWord = this.words[this.currentWordIndex]
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()¿¡]/g, '');
      const isCorrect = this.transcript.includes(currentWord);
      this.wordScores[currentWord] = isCorrect;
      if (!isCorrect) {
        this.mispronounced.push(currentWord);
      }
      this.nextWord();
    } else {
      const textWords = this.currentBook.content
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()¿¡]/g, '')
        .split(/\s+/);
      const transcriptWords = this.transcript
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()¿¡]/g, '')
        .split(/\s+/);

      let correctWords = 0;
      textWords.forEach((word: string, index: number) => {
        if (
          transcriptWords[index] &&
          (transcriptWords[index].includes(word) ||
            word.includes(transcriptWords[index]))
        ) {
          correctWords++;
        } else if (!this.mispronounced.includes(word)) {
          this.mispronounced.push(word);
        }
      });

      this.score = Math.round((correctWords / textWords.length) * 100);

      this.savePracticeResult();
    }
  }

  savePracticeResult() {
    const result = {
      bookId: this.currentBook.id,
      text: this.currentBook.content,
      transcript: this.transcript,
      mispronounced: this.mispronounced,
      score: this.score,
    };

    this.bookService.savePracticeResult(result).subscribe(
      (response) => {
        console.log('Practice result saved', response);
      },
      (error) => {
        console.error('Error saving practice result', error);
        this.error =
          'Oh no, no pudimos guardar tu práctica. ¿Intentamos de nuevo?';
      }
    );
  }

  resetPractice() {
    this.currentWordIndex = 0;
    this.transcript = '';
    this.mispronounced = [];
    this.score = null;
    this.error = null;
    this.wordScores = {};
    this.isPracticingWords = true;
  }
}
