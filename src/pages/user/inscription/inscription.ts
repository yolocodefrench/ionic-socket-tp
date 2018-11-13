import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ConnexionPage } from '../connexion/connexion'

/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {

  private userForm : FormGroup;
  private user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public httpClient: HttpClient) {
    this.userForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

  register(){
    const payload = {
      "Pseudo" : this.userForm.get('pseudo').value,
      "Password" : this.userForm.get('password').value
    }
    console.log(payload)
    this.user = this.httpClient.post('http://localhost:3000/create', payload).subscribe(
      response => {
        console.log(response)
        this.navCtrl.popToRoot();
      },
      error =>{
        console.log(error)
      }
    )
  }

}
