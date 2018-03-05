import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { List } from '../models/List'

import 'rxjs/add/operator/map';

@Injectable()
export class ListService {

    constructor(private http: Http) { }

    private serverApi= 'http://localhost:8000';

    public getAllLists():Observable<List[]> {

        let URI = `${this.serverApi}/items/`;
        return this.http.get(URI)
            .map(res => res.json())
            .map(res => <List[]>res.rows);
    }

    public deleteList(listId : string) {
      let URI = `${this.serverApi}/items/${listId}`;
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        return this.http.delete(URI, {headers})
        .map(res => res.json());
    }

    public addList(list: List) {
        let URI = `${this.serverApi}/items/`;
        let headers = new Headers;
         let body = JSON.stringify({title: list.title, description: list.description, category: list.category});
         console.log(body);
        headers.append('Content-Type', 'application/json');
        return this.http.post(URI, body ,{headers: headers})
        .map(res => res.json());
    }

}

