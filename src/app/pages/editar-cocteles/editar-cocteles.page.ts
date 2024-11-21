import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-cocteles',
  templateUrl: './editar-cocteles.page.html',
  styleUrls: ['./editar-cocteles.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarCoctelesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
