import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  messages = [];
  listUser = [];

  messageInput : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private formBuilder: FormBuilder,  private storage: Storage) {
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });
    this.getListUser().subscribe(response => {
      this.listUser = response['tableau'];
    });
    this.socket.emit('send-list-user', 'rien')
    this.messageInput = this.formBuilder.group({
      message: ['', Validators.required],
      selector: ['']
    });
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
  
  getListUser() {
    let observable = new Observable(observer => {
      this.socket.on('list-user', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  send(){
    if(this.messageInput.get('selector').value == ''){
      this.socket.emit('add-message', {text: this.messageInput.get('message').value, from: this.storage.get('pseudo')}); 
    }
    else{
      this.socket.emit('private', {destinataire: this.messageInput.get('selector').value,text: this.messageInput.get('message').value, from: this.storage.get('pseudo')});
    }
  
  }

  
}
