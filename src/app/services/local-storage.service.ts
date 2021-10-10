import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, item: string | number | object) {
    localStorage.setItem(key, JSON.stringify(item));
  }  

  getItem(key: string): object | null {
    let element = localStorage.getItem(key)
    if(element){
      return JSON.parse(element);
    }
    return null;   
  }
  
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  removeAll() {
    localStorage.clear();
  }
}
