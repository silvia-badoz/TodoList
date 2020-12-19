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
        console.log("Oops, something happened... Registration failed.");
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
        alert("Your email or password is incorrect. Please fill it again and make sure you already have an account.");
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
    console.log("You are disconnected.");
    this.router.navigate(['/menu']);
  }

}
