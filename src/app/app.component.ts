import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service'
import { Socket } from 'ng-socket-io';

import { ConnexionPage } from '../pages/user/connexion/connexion';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ConnexionPage;
  isAuth = false

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, private userService : UserService,  private socket: Socket) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.isAuth = this.userService.isAuth;
  }

  disconnect(){
    this.userService.deauthenticate()
    this.socket.emit('disconnect')
    console.log("bonjour au revoir")
  }
}

