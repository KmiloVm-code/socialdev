import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from './components/button/button';
import { Input } from './components/input/input';
import { Modal } from './components/modal/modal';
import { ShortenTextPipe } from './pipes/shorten-text-pipe';

@NgModule({
  declarations: [Button, Input, Modal, ShortenTextPipe],
  imports: [CommonModule, FormsModule],
  exports: [Button, Input, Modal, ShortenTextPipe, FormsModule],
})
export class SharedModule {}
