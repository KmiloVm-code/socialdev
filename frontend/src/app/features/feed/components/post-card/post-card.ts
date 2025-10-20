import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post as PostModel } from '../../../../core/models/post';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-post-card',
  standalone: false,
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.css'],
})
export class PostCard {
  @Input() post: PostModel | null = null;
  @Output() like = new EventEmitter<void>();
  @Output() share = new EventEmitter<void>();

  onLike() {
    this.like.emit();
  }

  onShare() {
    this.share.emit();
  }

  getAuthorName(): string {
    if (!this.post || !this.post.author) {
      return 'Usuario Desconocido';
    }

    if (typeof this.post.author === 'string') {
      return 'Usuario';
    }

    return (this.post.author as User).name || 'Usuario';
  }

  getAuthorAvatar(): string {
    if (!this.post || !this.post.author) {
      return 'assets/default-avatar.png';
    }

    if (typeof this.post.author === 'string') {
      return 'assets/default-avatar.png';
    }

    return (this.post.author as User).avatar || 'assets/default-avatar.png';
  }
}
