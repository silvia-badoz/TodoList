import {Component, OnInit, Output} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';
import { stringify } from 'querystring';
import { NgIf } from '@angular/common';
import {Observable, BehaviorSubject} from 'rxjs';
import { FirebaseApp } from '@angular/fire';
//import { FirebaseService } from '../services/firebase.service';
import { async } from '@angular/core/testing';


@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

    private todoList: TodoListData; 
    stateBeforeEdit: string;
    filter: string;  

    //OAuth 
    //@Output() isLogout = newEventEmitter<void>() 
    //
  
 
    constructor(private todoService: TodoService) {
        todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
    }

    ngOnInit() {
        this.filter = 'all'; 

    /*    for (let i=0; i<localStorage.length; i++) { //permet d'afficher la liste depuis local storage quand la page est rafraîchie 
            let index = localStorage.key(i);  //let index
            let item = JSON.parse(localStorage.getItem(index)); //let item
            this.appendItem(item.label); 
            //console.log(item, index);
            console.log(localStorage); 
           // this.appendItem();
         //   let localStorageItem = JSON.parse(localStorage.getItem('todoList'));
          //  return localStorageItem == null ? [] : localStorageItem.todoList;
           // console.log("item.label : " + item.label); 
           // console.log("index : " + index); //todoList (clé)
        } */

        //this.refresh(this.label); 
        this.refresh(this.label); 

 
    }

    //OAuth 
   /* logout() {
        this.firebaseService.logout()
        this.isLogout.emit()
    } */
    //
    
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

        let item = { //mettre dans une variable tout l'objet item et ses attributs 
            label, 
            isDone:false,
            editing:false
        }
        this.todoService.appendItems(item); 
      /*  this.todoService.appendItems({
            label,
            isDone:false,
            editing:false
        })  */

        localStorage.setItem(item.label, JSON.stringify(item)); // créer un objet dans local storage en même temps que la création d'une tâche dans la liste
        console.log(localStorage);
    }

    add(item:TodoItemData){
        let wronglabel = ' ';
        if (item.label == '' || item.label == wronglabel) { //Condition qui n'ajoute pas une tâche vide ou une tâche ne comportant qu'un espace
            return; 
        } 
        this.todoService.appendItems(item);
        localStorage.setItem(item.label, JSON.stringify(item));
    }

    refresh(label: string) {
        for (let i=0; i<localStorage.length; i++) { //permet d'afficher la liste depuis local storage quand la page est rafraîchie 
            let index = localStorage.key(i);  
            let item = JSON.parse(localStorage.getItem(index)); 
            //this.add(item.label); 
            this.add(item);
            console.log("local storage : " + localStorage); 
    }

    }

    itemDone(item: TodoItemData, done:boolean) {
        let test = true; 
      
          if (item.isDone == false) {
            this.todoService.setItemsDone(done, item); 
            //local storage 
            item.isDone = true; 
            localStorage.setItem(item.label, JSON.stringify(item)); //mise à jour de l'élément dans local storage (pour isdone)
            //
            test = false;
            }
        
        if(test) {
            this.todoService.setItemsDone(done, item); 
            //local storage 
            item.isDone = false; 
            localStorage.setItem(item.label, JSON.stringify(item)); //mise à jour de l'élément dans local storage (pour isdone)
            //
            test = false; 
        }
      }

    editTodo(item: TodoItemData): void {
        this.stateBeforeEdit = item.label; 
        item.editing = true; 
        //local storage FONCTIONNE PAS 
        localStorage.setItem(item.label, JSON.stringify(item)); //met editing à true dans local storage 
    }

    doneEdit(item: TodoItemData): void { 
        if (item.label.length === 0) {
           this.itemDelete(item); //permet de supprimer une tâche dans la liste (si en modifiant une tâche sa valeur vaut '')
           //local storage FONCTIONNE PAS 
           localStorage.removeItem(item.label); //supprime l'objet dans local storage 
           // localStorage.setItem(item.label, JSON.stringify(item)); 
        } 
      //  localStorage.removeItem(item.label); //supp l'ancien item 
      
       item.editing = false; 
       localStorage.setItem(item.label, JSON.stringify(item)); //met à false editing dans local storage quand fin de l'edit

    }

    cancelEdit(item: TodoItemData): void {
        item.label = this.stateBeforeEdit; 
        item.editing = false; 
        //local storage 
        localStorage.setItem(item.label, JSON.stringify(item)); //mettre editing à false si touche esc appuyée pour annuler l'edit
    }

    itemsLeft() { //compter le nombre de tâches restantes 
        let itemsLeft = 0; 
        for (var item of this.todoList.items) {
            if (item.isDone == false) {
                itemsLeft++; 
            }
        }

        if (itemsLeft == 1 || itemsLeft == 0) {
            return itemsLeft+" item left";
        }
        else return itemsLeft+" items left";
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
                //local storage 
                localStorage.removeItem(item.label); //supprime l'objet dans local storage 
            }
        }
    }

    checkAll(): void { 
        let test = true; 
        for (var item of this.todoList.items) {
            if (item.isDone == false) {
                this.todoService.setItemsDone(true,item); 
                //local storage 
                item.isDone = true; 
                localStorage.setItem(item.label, JSON.stringify(item)); //mise à jour de l'élément dans local storage (pour isdone)
                //
                test = false;
            }
        }
            if(test) {
                for (var item of this.todoList.items) {
                    this.todoService.setItemsDone(false,item); 
                    //local storage 
                    item.isDone = false; 
                    localStorage.setItem(item.label, JSON.stringify(item)); //mise à jour de l'élément dans local storage (pour isdone)
                    //
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
        } 
    
    itemLabel(item: TodoItemData, label:string) { //MARCHE PAS !! 
       // this.todoService.setItemsLabel(label, item); 
        //local storage
        // pour modifier l'item dans le localStorage, je le supprime dans un premier temps du localStorage, puis je remet le nouvel item modifié 
        // Changer le nom de l'item
        localStorage.removeItem(item.label); // Supprimer l'item du localStorage 
        this.todoService.setItemsLabel(label,item);
        item.label = label; 
        localStorage.setItem(item.label, JSON.stringify(item)); // Remettre l'élément dans le localStorage
  
    }

    itemDelete(item:TodoItemData){ //bouton "croix" à droite de chaque item 
        this.todoService.removeItems(item);
        //localStorage
        localStorage.removeItem(item.label); //supprime l'objet dans local storage 
    }

    deleteAll(item:TodoItemData){ //bouton "Tout supprimer" du footer 
        for (var item of this.todoList.items) { 
            this.todoService.removeItems(item); //supprime les items un à un 
        }
        localStorage.clear(); //supprime tous les items du local storage 
    }

    //speech recognition
    

}
