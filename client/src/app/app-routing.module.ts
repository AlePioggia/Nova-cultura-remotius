import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/src/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'bio',
    loadChildren: () =>
      import('src/app/src/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('src/app/src/homepage/homepage.module').then(
        (m) => m.HomepageModule
      ),
  },
  {
    path: 'lesson',
    loadChildren: () =>
      import('src/app/src/lesson/lesson.module').then((m) => m.LessonModule),
  },
  {
    path: 'review',
    loadChildren: () =>
      import('src/app/src/review/review.module').then((m) => m.ReviewModule),
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import('src/app/src/wallet/wallet.module').then((m) => m.WalletModule),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('src/app/src/chat/chat.module').then((m) => m.ChatModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
