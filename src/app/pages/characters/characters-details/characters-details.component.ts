import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@shared/services/data.service';
import { Observable, take, tap } from 'rxjs';

@Component({
    selector: 'app-characters-details',
    templateUrl: './characters-details.component.html',
    styleUrls: ['./characters-details.component.scss'],
})
export class CharactersDetailsComponent {
    character$!:Observable<any>
    constructor(private route: ActivatedRoute, private dataSvc:DataService) {
        this.route.params
            .pipe(
                take(1),
                tap(({id}) => (this.character$ = this.dataSvc.getDetails(id)))
            )
            .subscribe();
    }
}
