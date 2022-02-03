import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '/',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'todos',
        component: TodoItemComponent,
        data: { animation: 'FilterPage' }
      },
      {
        path: 'users',
        component: TodoItemComponent,
        canActivate: [AdminGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
