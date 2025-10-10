import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Layout } from './layout';
import { RouterModule } from '@angular/router';
import { BottomNav } from './components/bottom-nav/bottom-nav';

@NgModule({
  declarations: [Navbar, Layout, BottomNav],
  imports: [CommonModule, RouterModule],
  exports: [Layout],
})
export class LayoutModule {}
