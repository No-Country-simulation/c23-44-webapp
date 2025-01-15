import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// export enum UserRole {
//   ADMIN = 'admin',
//   PROFESSOR = 'professor',
//   PARENT = 'parent'
// }

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @BeforeInsert()
  checkFieldsBeforeIntert() {
    this.email = this.email.toLowerCase().trim();
  }

  // @Column({
  //   type: 'enum',
  //   enum: UserRole,
  //   default: UserRole.PARENT,
  // })
  // role: UserRole;

  // @OneToOne(() => Professor, { nullable: true })
  // @JoinColumn()
  // professorProfile: Professor;

  // @OneToOne(() => Parent, { nullable: true })
  // @JoinColumn()
  // parentProfile: Parent;
}
