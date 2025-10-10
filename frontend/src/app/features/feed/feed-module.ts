import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing-module';
import { Feed } from './feed';
import { PostCard } from './components/post-card/post-card';
import { PostList } from './components/post-list/post-list';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [Feed, PostCard, PostList],
  imports: [CommonModule, FeedRoutingModule, SharedModule],
})
export class FeedModule {}
