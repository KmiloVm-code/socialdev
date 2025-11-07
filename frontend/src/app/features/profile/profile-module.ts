import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared-module';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing-module';
import { Profile } from './profile';
import { UserInfo } from './components/user-info/user-info';
import { UserProjects } from './components/user-projects/user-projects';
import { ModalProfile } from './components/modal-profile/modal-profile';

@NgModule({
  declarations: [Profile, UserInfo, UserProjects, ModalProfile],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, ReactiveFormsModule],
})
export class ProfileModule {}
