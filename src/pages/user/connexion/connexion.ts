import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { InscriptionPage } from '../inscription/inscription'
import { MessagesPage } from '../../messages/messages'
import { Storage } from '@ionic/storage';
import { Socket } from 'ng-socket-io';
import { UserService } from '../../../services/user.service'
/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {

  private userForm : FormGroup;
  pushRegister: any;
  private user = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public httpClient: HttpClient, private storage: Storage, private socket: Socket, private userService :UserService) {
    this.userForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.pushRegister = InscriptionPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

  connect(){
    const payload = {
      "Pseudo" : this.userForm.get('pseudo').value,
      "Password" : this.userForm.get('password').value
    }
    console.log(payload)
    this.user = this.httpClient.post('http://localhost:3000/', payload).subscribe(
      response => {
        console.log(response)
        try{
          this.storage.set('pseudo', payload.Pseudo);
          this.storage.set('token', response["token"]);

          this.socket.connect();
          this.socket.emit('set-nickname', payload.Pseudo);
          this.userService.authenticate()
        }
        catch(error){
          console.log(error)
        }
        this.navCtrl.setRoot(MessagesPage)
        
      },
      error =>{
        console.log(error)
      }
    )
  }

}
