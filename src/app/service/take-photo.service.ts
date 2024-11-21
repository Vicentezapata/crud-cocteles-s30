import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import {Platform} from '@ionic/angular'
@Injectable({
    providedIn: 'root',
})
export class TakePhotoService {
    photo: string | null = null; // Almacena la URI de la foto
    location: { latitude: number; longitude: number } | null = null; // Almacena la ubicación
    address: string | null = null; // Almacena la dirección

    constructor(private platform:Platform){
       
    }

    async takePhoto(){
        const cameraSource = this.platform.is('android') ? CameraSource.Photos:CameraSource.Camera;
        //Tomar la foto de la camara
        const image = await Camera.getPhoto({
            quality: 90,
            resultType: CameraResultType.Uri, // Usar Uri para obtener la URI de la imagen
            source: cameraSource,
        })
        //verificar si image webpath no es undefined
        this.photo = image.webPath || null
        // Obtener la ubicación
        const coordinates = await Geolocation.getCurrentPosition()
        this.location = {
            latitude: coordinates.coords.latitude,
            longitude: coordinates.coords.longitude,
        }
        //Obtener direccion
        this.address = await this.getAddressFromCoordinate(this.location.latitude,this.location.longitude)
        return {
            photo: this.photo,
            location: this.location,
            address: this.address,
          };
    }
    async getAddressFromCoordinate(latitude:number,longitude:number):Promise<string|null>{
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        try{
            const response = await fetch(url)
            const data = await response.json()
            return data.display_name || 'Dirección no disponible';
        }catch(error){
            console.error('Error al obtener la dirección:', error);
            return null;
        }

    }
}