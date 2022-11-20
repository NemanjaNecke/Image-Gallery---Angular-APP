import {Image} from './imageModel';


export interface UserResponse {
    "access_token": string,
    "refresh_token": string,
    "user": {
        "pk": number,
        "username": string,
        "email": string,
        "first_name": string,
        "last_name": string
    }
}


export class DecodedToken {
    'exp': number;
    'username': string;
  }

export interface Profile {
    "id": number,
    "profilepic": Profilepic[],
    "url": string,
    "user": User
}

export interface User{
    'id': number;
        'url': string;
        'username': string;
        'email': string;
        'is_staff': boolean;
        'first_name': string;
        'last_name': string;
        'author': Image[];
}

export interface Profilepic {
    "id": number,
    "pic": string,
    'profile': number,
    'selected': boolean
}