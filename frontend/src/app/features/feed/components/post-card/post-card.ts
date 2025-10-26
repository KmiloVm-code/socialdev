import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post as PostModel } from '../../../../core/models/post';
import { User } from '../../../../core/models/user';
import { Post } from '../../../../core/services/post/post';

@Component({
  selector: 'app-post-card',
  standalone: false,
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.css'],
})
export class PostCard {
  @Input() post: PostModel | null = null;
  @Input() currentUserId: string | undefined;
  @Output() like = new EventEmitter<void>();
  @Output() share = new EventEmitter<void>();
  @Output() deletePost = new EventEmitter<void>();

  constructor(private postService: Post) {}

  onLike(): void {
    if (this.post) {
      this.postService.likePost(this.post._id).subscribe({
        next: (response) => {
          this.post = response;
          this.like.emit();
        },
        error: (error) => {
          console.error('Error al dar like:', error);
        },
      });
    }
  }

  isLikedByCurrentUser(): boolean {
    if (!this.post || !this.currentUserId) {
      return false;
    }
    return this.post.likes.includes(this.currentUserId);
  }

  isPostByCurrentUser(): boolean {
    if (!this.post || !this.currentUserId) {
      return false;
    }
    return this.post.author._id === this.currentUserId;
  }

  onDeletePost(): void {
    if (this.post) {
      this.postService.deletePost(this.post._id).subscribe({
        next: () => {
          // Solo emite el evento después de que el backend confirme la eliminación
          this.deletePost.emit();
        },
        error: (error) => {
          console.error('Error al eliminar el post:', error);
        },
      });
    }
  }

  onShare(): void {
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
