import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Post } from '../../core/services/post/post';
import { Post as PostModel } from '../../core/models/post';
import { Auth } from '../../core/services/auth/auth';
import { User } from '../../core/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  standalone: false,
  templateUrl: './feed.html',
  styleUrls: ['./feed.css'],
})
export class Feed implements OnInit {
  posts: PostModel[] = [];
  loading = true;
  @Output() postCreated = new EventEmitter<PostModel>();
  currentUser$: Observable<User | null>;

  constructor(private postService: Post, private authService: Auth) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.loadPosts();
  }

  onDeletePost(postId: string): void {
    // Elimina el post del array local
    this.posts = this.posts.filter(post => post._id !== postId);
  }

  loadPosts() {
    this.loading = true;
    this.postService.getPosts().subscribe({
      next: (posts: PostModel[]) => {
        this.posts = posts;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  trackByPostId(index: number, post: PostModel): any {
    return post._id || index;
  }
}
