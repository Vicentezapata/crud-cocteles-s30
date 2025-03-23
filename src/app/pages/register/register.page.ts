import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonInput, IonButton, IonToggle, IonInputPasswordToggle, IonRow, IonCol, IonText } from '@ionic/angular/standalone';
import {StorageService} from '../../service/storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonInput, IonButton, IonToggle, IonInputPasswordToggle, IonRow, IonCol, IonText ]
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  confirmPassword: string = '';


  constructor(private router: Router, private storage:StorageService) { }

  ngOnInit() {
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }

  async register(){
    if(this.password !== this.confirmPassword){
      console.log('Passwords do not match');
      return;
    }
    const user = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    }
    await this.storage.registerUser(this.email, this.password,this.firstName,this.lastName);
    this.router.navigate(['/login']);
  }

}
