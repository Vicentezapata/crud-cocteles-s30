import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg,IonFab,IonFabButton,IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // Importa el módulo para la navegación entre rutas
import { Motion } from '@capacitor/motion';
//ICONOS
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { HttpClient,HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonFab,
    IonFabButton,
    IonIcon
  ],
})
export class RandomPage implements OnInit {
  cocktail: any; // Store the fetched cocktail data
  constructor(private router: Router,private http:HttpClient) {
    addIcons({ arrowBackOutline });
   }

  ngOnInit() {
    this.startShakeDetection()
  }

  async startShakeDetection() {
    await Motion.addListener('accel', async (event)=>{
      console.log('TEST MOTION')
      const nivel = -1
      if(
        Math.abs(event.acceleration.x) > nivel &&
        Math.abs(event.acceleration.y) > nivel &&
        Math.abs(event.acceleration.z) > nivel){
          try{
            const response = await this.http.get('https://www.thecocktaildb.com/api/json/v1/1/random.php').toPromise();
            if(response && (response as any).drinks && (response as any).drinks.length > 0){
              this.cocktail = (response as any).drinks[0];
            }else {
              console.error('Invalid API response format');
            }
          }
          catch(error){
            console.log("Error al obtener api")
          }
        }

    })
  }
  goToListar() {
    this.router.navigate(['/listar-cocteles']);
  }
}
