import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ShortenedUrl } from '../url/shortened-url.entity'
import { UrlAccess } from '../url/acessed-url.service.ts/acessed-url.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { select: true })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ShortenedUrl, url => url.user)
  urls: ShortenedUrl[];

  @OneToMany(() => UrlAccess, url => url.user)
  acesses: UrlAccess[];
}
