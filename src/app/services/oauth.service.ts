import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase';
import { User } from '../dataTypes/UserData';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private router : Router) { }

  signUp(user: User) { //méthode pour enregistrer un nouvel utilisateur 
    firebase.auth().createUserWithEmailAndPassword(user.email, user.pwd)
      .then((res) => {
        console.log("Registration successfully completed !");
        this.router.navigate(['/yourTodoList']);
      })
      .catch(function (error) {
        console.log("Une erreur est survenue, votre inscription n'a pas pu être effectuée...");
        alert("Oops, something happened... Registration failed.");
      });
  }

  signIn(user: User) { //méthode pour connecter un utilisateur
    firebase.auth().signInWithEmailAndPassword(user.email, user.pwd)
      .then((res) => {
        console.log("Connection successfully completed !");
        this.router.navigate(['/yourTodoList']);
      })
      .catch(function (error) {
        console.log("Oops, something happened... Connection failed.");
      });
  }

  loggedIn() { //vérifie qu'un utilisateur soit connecté
    const user = firebase.auth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  logout() { //méthode de déconnexion
    firebase.auth().signOut();
    this.router.navigate(['/menu']);
  }

}
