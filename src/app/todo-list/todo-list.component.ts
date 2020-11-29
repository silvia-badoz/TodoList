import {Component, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';
import { stringify } from 'querystring';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

    private todoList: TodoListData; 
    stateBeforeEdit: string;
    filter: string; 
 
    constructor(private todoService: TodoService) {
        todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
    }

    ngOnInit() {
        this.filter = 'all'; 
    }
    
    get label(): string {
        return this.todoList.label;
    }
    
    get items(): TodoItemData[] {
        return this.todoList.items;
    }

    appendItem(label: string) {
        let wronglabel = ' ';
        if (label == '' || label == wronglabel) { //Condition qui n'ajoute pas une tâche vide ou une tâche ne comportant qu'un espace
            return; 
        } 
        this.todoService.appendItems({
            label,
            isDone:false,
            editing:false
        }) 
    }

    itemDone(item: TodoItemData, done:boolean) {
        this.todoService.setItemsDone(done, item); 
    }

    // ----- MODIFS -----
    editTodo(item: TodoItemData): void {
        this.stateBeforeEdit = item.label; 
        item.editing = true; 
    }

    doneEdit(item: TodoItemData): void { 
        if (item.label.length === 0) {
           this.itemDelete(item); //permet de supprimer une tâche dans la liste (si en modifiant une tâche sa valeur vaut '')
        } 
        item.editing = false; 
    }

    cancelEdit(item: TodoItemData): void {
        item.label = this.stateBeforeEdit; 
        item.editing = false; 
    }

    itemsLeft() {
        let itemsLeft = 0; 
        for (var item of this.todoList.items) {
            if (item.isDone == false) {
                itemsLeft++; 
            }
        }

        if (itemsLeft == 1 || itemsLeft == 0) {
            return itemsLeft+" tâche restante";
        }
        else return itemsLeft+" tâches restantes"
    }

    minimumOneCompleted(): boolean { 
        let itemsLeft = 0; 
        for (var item of this.todoList.items) {
            if (item.isDone == true) {
                itemsLeft++; 
            }
        }
        return itemsLeft>0;
    } 

    clearCompleted(): void {
        for (var item of this.todoList.items) {
            if (item.isDone == true) {
                this.todoService.removeItems(item); 
            }
        }
    }

    checkAll(): void { 
        let test = true; 
        for (var item of this.todoList.items) {
            if (item.isDone == false) {
                this.todoService.setItemsDone(true,item); 
                test = false;
            }
        }
            if(test) {
                for (var item of this.todoList.items) {
                    this.todoService.setItemsDone(false,item); 
                }
                test = false; 
            }
    }

    filterState() {
        let activeTasks = []; 
        let completedTasks = null; 

        if (this.filter === 'all') {
            return this.todoList.items; 
        }
        else if (this.filter === 'active') {
            return this.todoList.items.filter(item => !item.isDone);
        }
        else if (this.filter === 'completed') {
            return this.todoList.items.filter(item => item.isDone);
            }
        } //fin filterState() 
    
    
    // ----- FIN MODIFS ----- 

    itemLabel(item: TodoItemData, label:string) {
        this.todoService.setItemsLabel(label, item); 
    }

    itemDelete(item:TodoItemData){
        this.todoService.removeItems(item);
    }

}
