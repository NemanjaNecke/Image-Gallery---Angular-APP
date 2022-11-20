export interface Image {
    "id": number;
    "category": Category[];
    "title": string;
    "alt": string;
    "created": Date;
    "author": number;
    "status": string;
    "image": string;
}

export interface Category {
    "id": number, 
    "name": string
}