import { Component } from '@angular/core';
import { LocalStorageService } from '@shared/services/localStorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    charactersFav$ = this.localStorageSvc.charactersFav$
    constructor(private localStorageSvc:LocalStorageService){}

}
