import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing-module';
import { Explore } from './explore';
import { DeveloperCard } from './components/developer-card/developer-card';
import { ProjectCard } from './components/project-card/project-card';


@NgModule({
  declarations: [
    Explore,
    DeveloperCard,
    ProjectCard
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule
  ]
})
export class ExploreModule { }
