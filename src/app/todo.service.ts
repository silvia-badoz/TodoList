import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';
import { isNgTemplate } from '@angular/compiler';

@Injectable()
export class TodoService {

  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: []} );
 

  constructor() { 
    //local storage 
   // this.todoListSubject = new BehaviorSubject<TodoListData>(JSON.parse(localStorage.getItem("todoList")));

  }

  getTodoListDataObservable(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, isDone: I.isDone, editing: I.editing}) )
    });
    //local storage
   // this.updateLS();
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone, editing: I.editing}) )
    });
  //  this.updateLS();
  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
  //  this.updateLS();
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
  //  this.updateLS();
  }

 /*
  //remplissage dans local storage
   addLS(){
    if(!localStorage.getItem('todoList')){
      let item = JSON.stringify(this.todoListSubject.getValue());
      localStorage.setItem("todoList", item);
    }
  }

  //mise à jour dans local storage
  updateLS(){
    var newItem = JSON.stringify(this.todoListSubject.getValue());
    localStorage.setItem("todoList", newItem);
  } 
  */

}
