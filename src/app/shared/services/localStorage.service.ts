import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@shared/interfaces/data.interface';
import { ToastrService } from 'ngx-toastr';

const MY_FAVORITES = 'myFavorites';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private charactersFavSubject = new BehaviorSubject<Character[]>([]);
    charactersFav$ = this.charactersFavSubject.asObservable();

    constructor(private toastrSvc:ToastrService) {
        this.initialStorage();
    }

    getFavoritesCharacters(): any {
        try {
            const characterData = localStorage.getItem(MY_FAVORITES);
            if (characterData) {
                const charactersFav = JSON.parse(characterData);
                this.charactersFavSubject.next(charactersFav);
                return charactersFav;
            }
        } catch (e) {
            console.log('Error getting favorites from localStorage', e);
        }
    }

    private initialStorage(): void {
        const storedData = localStorage.getItem(MY_FAVORITES);
        if (!storedData) {
            localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
        }
        this.getFavoritesCharacters();
    }

    private removeFromFavorite(id: number): void {
        try {
            const currentsFav = this.getFavoritesCharacters();
            const characters = currentsFav.filter((item:Character) => item.id !== id);
            localStorage.setItem(MY_FAVORITES,JSON.stringify([...characters]))
            this.charactersFavSubject.next([...characters]);
            this.toastrSvc.warning(`Removed from favorite`,'RickAndMortyApp')
        } catch (e) {
            console.log('Error removing localStorage', e);
            this.toastrSvc.error(`Error removing localStorage ${e}`,'RickAndMortyApp')
        }
    }

    private addToFavorite(character: Character): void {
        try {
            const currentsFav = this.getFavoritesCharacters();
            localStorage.setItem(
                MY_FAVORITES,
                JSON.stringify([...currentsFav, character])
            );
            this.charactersFavSubject.next([...currentsFav, character]);
            this.toastrSvc.success(`${character.name} added to favorites`,'RickAndMortyApp')
        } catch (e) {
            console.log('Error saving favorites to localStorage', e);
            this.toastrSvc.error(`Error saving favorites to localStorage ${e}`,'RickAndMortyApp')
        }
    }

    addOrRemoveFavorite(character: Character): void {
        const { id } = character;
        const currentsFav = this.getFavoritesCharacters();
        const found = !!currentsFav.find((fav: Character) => fav.id === id);
        found ? this.removeFromFavorite(id) : this.addToFavorite(character);
    }
}
