export class Media {
    constructor(public date: Date, public mediapath: string, public id?: number) {

        this.id = id;
        this.date = date;
        this.mediapath = mediapath;
    }
}