import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpCounterService {

  private static PORT: string = '80';

  private static counterUrlBase = `http://angular-shared-counter.herokuapp.com:${HttpCounterService.PORT}`;
  private static counterUrlGet = `${HttpCounterService.counterUrlBase}/get`;
  private static counterUrlIncrement = `${HttpCounterService.counterUrlBase}/increment`;
  private static counterUrlDecrement = `${HttpCounterService.counterUrlBase}/decrement`;

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCounter(): Observable<number> {
    console.log(`http get to ${HttpCounterService.counterUrlGet}`);
    return this.http.get<number>(HttpCounterService.counterUrlGet)
      .pipe(
        catchError(this.handleError<number>('getCounter', -1))
      );
  }

  increment(): Observable<number> {
    console.log(`http get to ${HttpCounterService.counterUrlIncrement}`);
    return this.http.get<number>(HttpCounterService.counterUrlIncrement)
      .pipe(
        catchError(this.handleError<number>('getCounter', -1))
      );
  }

  decrement(): Observable<number> {
    console.log(`http get to ${HttpCounterService.counterUrlDecrement}`);
    return this.http.get<number>(HttpCounterService.counterUrlDecrement)
      .pipe(
        catchError(this.handleError<number>('getCounter', -1))
      );
  }
}
