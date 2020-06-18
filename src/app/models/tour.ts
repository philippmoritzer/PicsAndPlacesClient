import { User } from 'src/app/models/user';
import { Location } from './location';
import { Category } from './category';
export class Tour {

    id: number;
    name: string;
    description: string;
    length: number;
    category: Category;
    createUser: User;
    locations: Location[] = [];
    createdTime: Date;
    updateTime: Date;

    constructor(name: string, description: string, length: number, category: Category, locations: Location[], createUser: User,
        createdTime?: Date, updateTime?: Date, id?: number) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.length = length;
        this.category = category;
        this.locations = locations;
        this.createUser = createUser;
        this.createdTime = createdTime;
        this.updateTime = updateTime;

    }
}