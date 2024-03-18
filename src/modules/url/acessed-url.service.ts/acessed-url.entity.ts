import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShortenedUrl } from '../shortened-url.entity';
import { User } from '../../user/user.entity';

@Entity('url_accesses')
export class UrlAccess {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('uuid')
  shortened_url_id: string;

  @Column('uuid', {nullable: true})
  user_id?: string | null;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => ShortenedUrl, shortenedUrls => shortenedUrls.acesses)
  @JoinColumn({ name: 'shortened_url_id', referencedColumnName: 'id' })
  shortenedUrls: ShortenedUrl;

  @ManyToOne(() => User, shortenedUrls => shortenedUrls.acesses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
