import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, take, tap, map, withLatestFrom } from 'rxjs';
import { Episode, Character, DataResponse } from '../interfaces/data.interface';
import { LocalStorageService } from './localStorage.service';

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

    constructor(
        private apollo: Apollo,
        private localStoregeSvc: LocalStorageService
    ) {
        this.getDataApi();
    }

    getCharactersByPage(pageNum:number):void{

        const QUERY_BY_PAGE = gql`{
        characters(page:${pageNum}) {
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
    }`;
        this.apollo.watchQuery<any>({
            query: QUERY_BY_PAGE
        }).valueChanges.pipe(
            take(1),
            map(({ data }) => data.characters),
            withLatestFrom(this.characters$),
            tap(([apiResponse, characters])=>{
                this.parseCharactersData([...characters,...apiResponse.results])
            })
        ).subscribe()
    }

    private getDataApi(): void {
        this.apollo
            .watchQuery<DataResponse>({
                query: QUERY,
            })
            .valueChanges.pipe(
                take(1),
                tap(({ data }) => {
                    const { characters, episodes } = data;
                    this.episodeSubject.next(episodes.results);
                    this.parseCharactersData(characters.results)
                })
            )
            .subscribe();
    }
    private parseCharactersData(characters: Character[]): void {
        const currentsFav = this.localStoregeSvc.getFavoritesCharacters();
        const newData = characters.map((character) => {
            const found = !!currentsFav.find((fav:Character)=> fav.id === character.id)
            return {...character,isFavorite:found}
        });
        this.charactersSubject.next(newData)
    }
}
