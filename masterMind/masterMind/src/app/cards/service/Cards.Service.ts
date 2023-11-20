import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class FlipCardService {
    private apiUrl = "http://localhost:9091/flipcard/saveresult";
    constructor(private http: HttpClient) { }

    saveDataFlipCardGame(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, data);
    }
}



