import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable, Subject, tap, pipe, BehaviorSubject } from 'rxjs';
import { ClickData } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class ClickApiService {
  constructor(
    private httpClient: HttpClient
  ) { }


  getCountData() {
    return  this.httpClient.get<ClickData>(environment.BASE_URL + '/click-count/')
  }

  postCountData(ip:string, currentCount:number, city:string, country:string){
    return  this.httpClient.post<any>(environment.BASE_URL + '/click-count/',
      {"ip":ip, "currentCount": currentCount, "city": city, "country": country})

  }

}
