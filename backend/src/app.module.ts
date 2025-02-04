import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { ParentModule } from './parent/parent.module';
import { SchoolModule } from './school/school.module';
import { PaymentModule } from './payment/payment.module';
import { StudentModule } from './student/student.module';

import { BooksModule } from './books/books.module';
import { TeacherModule } from './teacher/teacher.module';
import { FilesModule } from './files/files.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

//import {path} from
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // set to false in production
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: true,
      }),
      inject: [ConfigService],
    }),
    SchoolModule,
    PaymentModule,
    ParentModule,
    StudentModule,
    BooksModule,
    TeacherModule,
    FilesModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
