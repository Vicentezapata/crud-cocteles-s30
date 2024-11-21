import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import {Router} from '@angular/router';
import {TakePhotoService} from '../../service/take-photo.service'


@Component({
  selector: 'app-agregar-cocteles',
  templateUrl: './agregar-cocteles.page.html',
  styleUrls: ['./agregar-cocteles.page.scss'],
  standalone: true,
  imports: [IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonInput, 
    IonButton, 
    IonImg, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent, 
    IonItem, 
    IonLabel, 
    IonSelect,
    IonSelectOption]
})
export class AgregarCoctelesPage implements OnInit {

  photo: string | null = null;
  location: { latitude: number; longitude: number } | null = null;
  address: string | null = null;

  cocktailName: string = '';
  cocktailAuthor: string = '';
  selectedIngredients: string[] = [];
  alcoholLevel: string = ''; // Aquí agregamos la variable para el nivel de alcohol

  ingredients: string[] = ['Ron', 'Tequila', 'Vodka', 'Limón', 'Menta', 'Azúcar', 'Hielo'];

  customAlertOptions: any = {
    header: 'Selecciona los ingredientes',
    subHeader: 'Elige uno o más ingredientes',
    message: 'Puedes seleccionar varios',
    translucent: true
  };

  constructor(private router:Router,private takePhotoService: TakePhotoService) { }

  ngOnInit() {
  }
  //Funcion para ambiar de pagina
  goToListar(){
    this.router.navigate(['/listar-cocteles'])
  }

  async capturePhoto() {
    const result = await this.takePhotoService.takePhoto()
    if(result){
      this.photo = result.photo;
      this.location = result.location;
      this.address = result.address;
    }

  }

  openSelector(selector: any) {
    selector.open();
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Formulario válido:', this.cocktailName, this.cocktailAuthor, this.selectedIngredients, this.alcoholLevel);
      this.goToListar();
    } else {
      console.log('Formulario inválido');
    }
  }

}
