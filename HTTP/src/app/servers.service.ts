import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServersService {

  constructor(private http: HttpClient) { }

// Send your own Header
  newHeader = new Headers({
    'Content-Type' : 'application/json'
  });

  storeServer(server: any[]){
       // Post Request
      // return this.http.post('https://angular-demo-c22eb.firebaseio.com/data.json', server, {headers: this.newHeader});

      // Put Request (Specific for Firebase put used for changing the value)
      return this.http.put('https://angular-demo-c22eb.firebaseio.com/data.json', server, {headers: this.newHeader});
  }

  getServer(){
    return this.http.get('https://angular-demo-c22eb.firebaseio.com/data.json').pipe(map(
      (response : Response) => {
        // const data  = response.json();
        return response;
      }
    )).pipe(catchError(
      error => {
        return throwError('Something Went Wrong..')
      }
    ));
  }


  // Using Async Pipe in HTTP
  getAppName(){
    return this.http.get('https://angular-demo-c22eb.firebaseio.com/AppData.json').pipe(map(
      (response : Response) => {
        return response;
      }
    ));
  }
}
