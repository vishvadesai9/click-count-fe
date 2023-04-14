import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { location } from '../models/location.model';
import { NONE_TYPE } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  locations$ = new BehaviorSubject<location[]>([]);
  totalCount$ = new BehaviorSubject<number>(0);


  constructor() { }

  getData(){
    return this.locations$.asObservable()
  }
  setData(data: any){
    this.locations$.next(data)
  }

  getTotalCount(){
    return this.totalCount$.asObservable()
  }
  setTotalCount(data: any){
    this.totalCount$.next(data)
  }
}
