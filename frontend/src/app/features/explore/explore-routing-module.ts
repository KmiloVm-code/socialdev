import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Explore } from './explore';

const routes: Routes = [{ path: '', component: Explore }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }
