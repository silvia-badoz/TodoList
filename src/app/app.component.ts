import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TodoService} from './todo.service';
import {TodoListData} from './dataTypes/TodoListData';
import {TodoItemData} from './dataTypes/TodoItemData';
import firebase from "firebase";
import { OauthService} from './services/oauth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private oauthService : OauthService) {
    const firebaseConfig = {
      apiKey: "AIzaSyCw0ksgOKWPgOV_IDdJO7p9eWQdmr5gE-c",
      authDomain: "todolist-da688.firebaseapp.com",
      projectId: "todolist-da688",
      storageBucket: "todolist-da688.appspot.com",
      messagingSenderId: "1045469199951",
      appId: "1:1045469199951:web:9a2d8ca2f440743e92b43a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig); 
  }

  connected() {
    return this.oauthService.loggedIn();
  }

  logoutBanniere() {
    this.oauthService.logout();
  }
}
