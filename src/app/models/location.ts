import { Media } from './media';
import { User } from './user';
import { Category } from './category';
import { Address } from './address';

export class Location {

    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    category: Category;
    address: Address;
    createUser: User;
    mediaList: Media[];
    createdTime: Date;
    updateTime: Date;

    constructor(name: string, description: string, latitude: number, longitude: number,
        category: Category, address: Address, createUser: User, mediaList: Media[], createdTime?: Date, updateTime?: Date, id?: number) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.category = category;
        this.address = address;
        this.createUser = createUser;
        this.mediaList = mediaList;
        this.createdTime = createdTime;
        this.updateTime = updateTime;
    }

}