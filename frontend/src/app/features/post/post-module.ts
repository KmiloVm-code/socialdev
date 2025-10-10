import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing-module';
import { Post } from './post';


@NgModule({
  declarations: [
    Post
  ],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
