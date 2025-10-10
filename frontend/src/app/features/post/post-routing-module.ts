import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Post } from './post';

const routes: Routes = [{ path: '', component: Post }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
