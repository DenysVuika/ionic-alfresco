import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'alf-login',
  template: `
    <ion-list>
      <ion-item>
        <ion-label floating>Username</ion-label>
        <ion-input type="text" value="" [(ngModel)]="username"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label floating>Password</ion-label>
        <ion-input type="password" value="" [(ngModel)]="password"></ion-input>
      </ion-item>
    </ion-list>
    <div padding>
      <button primary block (click)="loginTapped($event)">Sign In</button>
    </div>
  `
})
export class LoginComponent {

  @Input()
  username: string;

  @Input()
  password: string;

  @Output()
  success: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  failure: EventEmitter<any> = new EventEmitter<any>();

  /*
  @Input()
  ecm: boolean = true;
  */

  /*
  @Input()
  bpm: boolean = false;
  */

  constructor(private navController: NavController,
              private auth: AuthService) {
  }

  loginTapped(event) {
    this.auth
      .login(this.username, this.password)
      .then(
        () => this.success.emit({}),
        (error) => this.failure.emit({ error: error })
      );
  }

}
