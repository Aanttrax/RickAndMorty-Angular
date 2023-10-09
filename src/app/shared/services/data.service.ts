import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Episode,Character, DataResponse } from '../interfaces/data.interface';

const QUERY = gql`
    {
        episodes {
            results {
                name
                episode
            }
        }
        characters {
            results {
                id
                name
                id
                status
                species
                gender
                image
            }
        }
    }
`;

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private episodeSubject = new BehaviorSubject<Episode[]>([]);
    episodes$ = this.episodeSubject.asObservable();

    private charactersSubject = new BehaviorSubject<Character[]>([]);
    characters$ = this.charactersSubject.asObservable();
    constructor(private apollo: Apollo) {
        this.getDataApi()
    }

    private getDataApi(): void {
        this.apollo.watchQuery<DataResponse>({
            query:QUERY
        }).valueChanges.pipe(
            take(1),
            tap(({data})=>{
                const {characters,episodes}=data;
                this.charactersSubject.next(characters.results);
                this.episodeSubject.next(episodes.results);
            })
        ).subscribe();
    }
}
