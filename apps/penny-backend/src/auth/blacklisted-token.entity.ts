import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlacklistedToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expiresAt: Date; // The date and time when the token will expire
}
