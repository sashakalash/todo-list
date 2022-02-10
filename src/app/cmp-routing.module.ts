import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todos',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: ContentWrapperComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'todos',
        component: TodoListComponent,
        data: { animation: 'FilterPage' }
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminGuard]
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CmpRoutingModule {}
