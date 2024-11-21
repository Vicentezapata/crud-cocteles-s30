import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton, IonCard, IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonList,IonItem,IonThumbnail,IonLabel, IonFab, IonFabButton,IonIcon,IonSearchbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // Importa el módulo para la navegación entre rutas

import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importar HttpClient y su módulo

//ICONOS
import { addIcons } from 'ionicons';
import { add,wineOutline } from 'ionicons/icons';

export interface Coctel{
  nombre:String,
  descripcion:String,
  ingredientes:String[],
  alcoholico:boolean,
  precio:number,
  imagenUrl:String
}


@Component({
  selector: 'app-listar-cocteles',
  templateUrl: './listar-cocteles.page.html',
  styleUrls: ['./listar-cocteles.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonButton, CommonModule, FormsModule,IonCard, IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonList,IonItem,IonThumbnail,IonLabel, IonFab, IonFabButton,IonIcon,HttpClientModule,IonSearchbar]
})
export class ListarCoctelesPage implements OnInit {

  cocteles:Coctel[] = [
    { nombre: 'Tequila Margarita', descripcion: 'Un coctel refrescante con tequila y limón.', ingredientes: ['Tequila', 'Limón', 'Sal'], alcoholico: true, precio: 1200,imagenUrl:"https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg" },
    { nombre: 'Pisco Sour', descripcion: 'Una bebida ácida y espumosa a base de pisco.', ingredientes: ['Pisco', 'Limón', 'Azúcar', 'Clara de huevo'], alcoholico: true, precio: 1500,imagenUrl:"https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg" },
    { nombre: 'Ron Cola', descripcion: 'El clásico ron con cola.', ingredientes: ['Ron', 'Cola'], alcoholico: true, precio: 1000,imagenUrl:"https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg" },
    { nombre: 'Mojito', descripcion: 'Coctel cubano refrescante con menta.', ingredientes: ['Ron', 'Menta', 'Azúcar', 'Agua con gas'], alcoholico: true, precio: 1300,imagenUrl:"https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg" }
  ]

  private debounceTimer: any;
  searchTerm: string = '';



  constructor(private router: Router,private http: HttpClient) { 
    addIcons({ add,wineOutline });
  }

  ngOnInit() {
    //this.fetchCocteles();
  }
  goToCreate(){
    this.router.navigate(['/agregar-cocteles']);
  }
  goToRandom(){
    this.router.navigate(['/random']);
  }

  eliminarCoctel(index:number){
    this.cocteles.splice(index,1)
  }

   /**
   * Realiza una solicitud HTTP para obtener la lista de cócteles basada en el término de búsqueda
   * @param ingrediente El término de búsqueda (ingrediente)
   */
  fetchCocteles(ingrediente: string) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;

    this.http.get<{ drinks: any[] }>(url).subscribe({
      next: (response) => {
        if (response.drinks) {
          this.cocteles = response.drinks.map((drink) => ({
            nombre: drink.strDrink,
            descripcion: `Un delicioso cóctel con ${ingrediente}.`,
            ingredientes: [ingrediente],
            alcoholico: true,
            precio: 1500,
            imagenUrl: drink.strDrinkThumb
          }));
        } else {
          this.cocteles = []; // Limpiar lista si no hay resultados
        }
      },
      error: (err) => {
        console.error('Error al obtener los cócteles:', err);
      }
    });
  }

  onSearch() { 
    // 1. Cancelar el temporizador de debounce anterior
    clearTimeout(this.debounceTimer); 
    // Esto es importante porque cada vez que el usuario escribe un carácter en la barra de búsqueda,
    // se cancelará cualquier búsqueda anterior que no se haya completado. Así, evitamos
    // realizar varias solicitudes a la API innecesarias mientras el usuario sigue escribiendo.

    // 2. Log para depuración
    console.log("Buscando: " + this.searchTerm);
    // Esto solo es para mostrar en la consola lo que el usuario está escribiendo, útil para depuración.

    // 3. Iniciar un nuevo temporizador de debounce
    this.debounceTimer = setTimeout(() => {
        // 4. Eliminar los espacios en blanco al principio y al final del término de búsqueda
        const trimmedSearchTerm = this.searchTerm.trim();

        // 5. Si el término de búsqueda no está vacío, realizar la búsqueda
        if (trimmedSearchTerm) {
            // Si el término de búsqueda es válido (no vacío), se llama a la función `fetchCocteles`
            // para realizar la búsqueda de cócteles según el término ingresado.
            this.fetchCocteles(trimmedSearchTerm);
        } else {
            // 6. Si el término de búsqueda está vacío, vaciar la lista de cócteles
            // Esto asegura que, cuando el usuario borra el término de búsqueda, la lista de cócteles
            // se vacíe y no se muestre ningún resultado.
            this.cocteles = [];
        }
    }, 300); // 7. Retraso de 300ms para esperar a que el usuario deje de escribir
    // El valor de 300ms es el tiempo de espera para el debounce. Es decir, después de que el usuario deja
    // de escribir por 300ms, se ejecuta la búsqueda. Si el usuario sigue escribiendo, se reinicia el temporizador.
}

}
