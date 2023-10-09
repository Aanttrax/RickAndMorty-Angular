import { Component } from '@angular/core';
import { LocalStorageService } from '@shared/services/localStorage.service';
import { DataService } from '@shared/services/data.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
    characters$ = this.dataSvc.characters$;
    constructor(private dataSvc: DataService, private localStorageSvc:LocalStorageService) {}
}
