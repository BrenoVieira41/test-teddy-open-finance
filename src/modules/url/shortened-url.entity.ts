import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { UrlAccess } from './acessed-url.service.ts/acessed-url.entity';

@Entity('shortened_urls')
export class ShortenedUrl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  url: string;

  @Column('varchar', { unique: true })
  shortened_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column('uuid', {nullable: true})
  user_id?: string | null;

  @ManyToOne(() => User, user => user.urls, { nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => UrlAccess, url => url.shortenedUrls)
  acesses: UrlAccess[];
}
