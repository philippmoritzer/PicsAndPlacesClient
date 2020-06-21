import { City } from './city';
import { Country } from './country';
export class Address {

    id: number;
    street: string;
    number: number;
    zipcode: string;
    city: City;
    country: Country;

    constructor(street: string, number: number, zipcode: string, city: City, country: Country, id?: number) {
        this.id = id;
        this.street = street;
        this.number = number;
        this.zipcode = zipcode;
        this.city = city;
        this.country = country;
    }
}