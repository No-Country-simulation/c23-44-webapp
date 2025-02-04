import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class Files {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column('bytea')
  data: Buffer;
}
