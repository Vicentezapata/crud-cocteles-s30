import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;


  constructor(private storage: Storage) {
    this.init();

  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
    this._storage.setEncryptionKey('mySecretKey');
  }

  public async set(key: string, value: any){
    await this._storage?.set(key, value);
  }

  public async get(key: string){
    return await this._storage?.get(key);
  }

  public async registerUser(email: string, password: string, firstName: string, lastName: string ){
    const user = {email, password, firstName, lastName};
    console.log(user);
    await this.set(email, user);
  }

  public async loginUser(email: string, password: string): Promise<boolean> {
    const user = await this.get(email);
    if(user){
      if(user.password === password){
        return true;
      }
      else{
        return false;
      }
    }
    return false;
  }
}
