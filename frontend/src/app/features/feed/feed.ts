import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Post } from '../../core/services/post/post';
import { Post as PostModel } from '../../core/models/post';

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

  constructor(private postService: Post) {}

  ngOnInit() {
    this.loadPosts();
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

  createPost(content: string) {
    this.postService.createPost(content).subscribe((newPost: PostModel) => {
      this.posts.unshift(newPost);
      this.postCreated.emit(newPost);
    });
  }

  trackByPostId(index: number, post: PostModel): any {
    return post._id || index;
  }
}
