import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: {[lang: string]: {[key: string]: string}} = {
    'ru': {
      '':'',
      'CREATE GROUP':'Создать группу',
      'PUPIL':'Ученик',
      'PUPILS':'Ученики',
      'TRAINING':'Тренажер',
      'TEACHER':'Учитель',
      'TEACHERS':'Учителя',
      'COUNT OF PUPILS':'Количество учеников',
      'SEARCH':"Поиск",
      'MY GROUPS':'Мои группы',
      'LOGIN': 'Вход',
      'USERNAME': 'Имя пользователя',
      'PASSWORD': 'пароль',
    },
    'kg': {
      '':'',
      'CREATE GROUP':'Жаңы группа',
      'PUPIL':'Окуучу',
      'PUPILS':'Окуучулар',
      'TRAINING':'Тренажер',
      'TEACHER':'Мугалим',
      'TEACHERS':'Мугалимдер',
      'COUNT OF PUPILS':'Окуучулардын саны',
      'SEARCH':"Издөө",
      'MY GROUPS':'Менин группаларым',
      'LOGIN': 'Кирүү',
      'USERNAME': 'Колдонуучу',
      'PASSWORD': 'Сыр сөз',
    }
  };

  constructor() { }

  translate(key: string, lang: string): string {
    return this.translations[lang][key];
  }
}
