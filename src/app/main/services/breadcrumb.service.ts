import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private title = new BehaviorSubject<string>('');

  get getTitle$(): Observable<string> {
    return this.title.asObservable();
  }

  setTitle(title: string) {
    this.title.next(title);
  }

  constructor() { }
}
