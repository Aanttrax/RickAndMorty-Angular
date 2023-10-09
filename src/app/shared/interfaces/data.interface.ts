export interface Character {
    id: number;
    name: string;
    status:string;
    species:string;
    gender:string;
    image:string;
    isFavorite?:boolean;
}

export interface Episode {
    name:string;
    episode:string;
}

export interface ApiResponse<T>{
    results:T
}

export interface DataResponse{
    characters:ApiResponse<Character[]>;
    episodes:ApiResponse<Episode[]>;
}
