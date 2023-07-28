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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
