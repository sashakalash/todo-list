import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { NotificationShowerDirective } from './directives/notification-shower.directive';
import { TodoListState } from './store/todo-store/todo.state';
import { MaterialModule } from './material.module';
import { AuthState } from './store/auth-store/auth.state';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlidePanelComponent } from './components/slide-panel/slide-panel.component';
import { TodoCreateFormComponent } from './components/todo-create-form/todo-create-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CmpRoutingModule } from './cmp-routing.module';
import { CmpComponent } from './cmp.component';
import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './components/users/users.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    CmpComponent,
    TodoItemComponent,
    NotificationShowerDirective,
    LoginComponent,
    NotFoundComponent,
    SlidePanelComponent,
    TodoCreateFormComponent,
    TodoListComponent,
    ContentWrapperComponent,
    HeaderComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    CmpRoutingModule,
    NgxsModule.forRoot([TodoListState, AuthState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }
  ],
  bootstrap: [CmpComponent],
  entryComponents: [SlidePanelComponent]
})
export class CmpModule {}
