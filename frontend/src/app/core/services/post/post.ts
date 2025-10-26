import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api';
import { Post as PostModel, createPost } from '../../models/post';

@Injectable({
  providedIn: 'root',
})
export class Post {
  constructor(private apiService: ApiService) {}

  getPosts(): Observable<PostModel[]> {
    return this.apiService.get<PostModel[]>('/posts');
  }

  createPost(formData: FormData): Observable<PostModel> {
    return this.apiService.post<PostModel>('/posts', formData);
  }
}
