import { hashSync } from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, BeforeInsert, AfterInsert } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toJSON = () => {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  @BeforeInsert()
  private hashPassword = () => {
    const salt = 10;
    this.password = hashSync(String(this.password), salt);
  }

  @AfterInsert()
  private removePasswordField = () => {
    delete this.password;
  }
}
