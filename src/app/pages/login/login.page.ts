import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {StorageService} from '../../service/storage.service';

import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, 
  IonCardSubtitle, IonCardContent, IonInput, IonButton, IonToggle, IonInputPasswordToggle, 
  IonRow, IonCol, IonText 
} from '@ionic/angular/standalone'; // Importa componentes de Ionic para el diseño de la interfaz


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, 
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
    IonInput, IonButton, IonToggle, IonInputPasswordToggle, IonRow, IonCol, IonText
  ]
})
export class LoginPage implements OnInit {

  form!:FormGroup;

  constructor(private router: Router, private storage: StorageService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email:new FormControl(null,[
        Validators.required, //EL CAMPO ES REQUERIDO
        Validators.email
      ]),
      password:new FormControl(null,[
        Validators.required, //EL CAMPO ES REQUERIDO
        Validators.minLength(8)
      ]),
    })
  }
  goToRegister() {
    this.router.navigate(['/register']); // Redirige a la ruta '/register' para el registro de usuarios
  }
  async validar(){
    if(this.form.invalid){
      //QUE PASA SI EL FORMULARIO ES INVALIDO
      this.form.markAllAsTouched()
      return
    }
    const isValid = await this.storage.loginUser(this.form.value.email, this.form.value.password)
    if(isValid){
      this.router.navigate(['/listar-cocteles']);
    }else{
      console.log('Usuario o contraseña incorrecta');
    }
  }

}
