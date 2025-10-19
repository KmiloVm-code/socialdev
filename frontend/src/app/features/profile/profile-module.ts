import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared-module';

import { ProfileRoutingModule } from './profile-routing-module';
import { Profile } from './profile';
import { UserInfo } from './components/user-info/user-info';
import { UserProjects } from './components/user-projects/user-projects';

@NgModule({
  declarations: [Profile, UserInfo, UserProjects],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
