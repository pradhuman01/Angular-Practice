import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import "rxjs/RX";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numSubs: Subscription;
  CustomSubs: Subscription;

  constructor() { }

  ngOnInit() {
    const mynumber = Observable.interval(1000);
    this.numSubs = mynumber.subscribe(
      (num :number) => {
        console.log(num);
      }
    );

    const MyObs = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next("First Package");
      }, 2000);
      setTimeout(() => {
        observer.next("Second Package");
      }, 4000);
      setTimeout(() => {
        // observer.error("Doesnt Work");
        observer.complete();
      }, 6000);
      setTimeout(() => {
        observer.next("THird Package");
      }, 8000)
    });
    this.CustomSubs = MyObs.subscribe(
      (data :string) => { console.log(data) },
      (error :string) => { console.log(error) },
      () => { console.log("Completed") },
    );
  }

  ngOnDestroy(){
    this.numSubs.unsubscribe();
    this.CustomSubs.unsubscribe();
  }

}
