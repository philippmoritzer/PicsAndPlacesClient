import { User } from './user';
import { Tour } from './tour';
export class Rating {

    id: number;
    value: number;
    comment: string;
    createdUser: User;
    createdTime: Date;
    updateTime: Date;

    constructor(value: number, comment: string,
        createdUser: User, createdTime: Date, updateTime?: Date, id?: number) {

        this.id = id;
        this.value = value;
        this.comment = comment;
        this.createdUser = createdUser;
        this.createdTime = createdTime;
        this.updateTime = updateTime;

    }
}