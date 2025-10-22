import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicGuard } from './core/guards/public.guard';

const routes: Routes = [
  { path: 'login', component: Login, canActivate: [PublicGuard] },
  { path: 'register', component: Register, canActivate: [PublicGuard] },
  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
      },
      {
        path: 'feed',
        loadChildren: () => import('./features/feed/feed-module').then((m) => m.FeedModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile-module').then((m) => m.ProfileModule),
      },
      {
        path: 'post',
        loadChildren: () => import('./features/post/post-module').then((m) => m.PostModule),
      },
      {
        path: 'explore',
        loadChildren: () =>
          import('./features/explore/explore-module').then((m) => m.ExploreModule),
      },
      {
        path: 'chat',
        loadChildren: () => import('./features/chat/chat-module').then((m) => m.ChatModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
