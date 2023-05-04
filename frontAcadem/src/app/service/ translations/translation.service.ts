import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import translations from '../../../assets/translations.json'

interface Translations {
  [lang: string]: {
    [key: string]: string;
  }
}
@Injectable({
  providedIn: 'root'
})
export class TranslationService implements OnInit{

  constructor(private http: HttpClient) {}

  ngOnInit():void{
  }

  translate(key: string, lang: string): string {
    const translation: Translations = translations;
    return translation[lang][key];
  }
}
