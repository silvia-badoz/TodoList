import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AutofocusModule } from 'angular-autofocus-fix'; 
import { AngularFireModule } from '@angular/fire'
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {TodoService} from './todo.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path : 'menu', component: MenuComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'yourTodoList', component: TodoListComponent },

  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: '**', redirectTo: '/menu', }

];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent, 
    SigninComponent, 
    SignupComponent, MenuComponent
  ],
  imports: [
    BrowserModule, FormsModule, AutofocusModule,  RouterModule.forRoot(routes), ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
