import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared-module';
import { ReactiveFormsModule } from '@angular/forms';

import { PostRoutingModule } from './post-routing-module';
import { Post } from './post';

@NgModule({
  declarations: [Post],
  imports: [CommonModule, PostRoutingModule, SharedModule, ReactiveFormsModule],
})
export class PostModule {}
