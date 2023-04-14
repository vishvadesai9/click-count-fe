import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable, Subject, tap, pipe, BehaviorSubject } from 'rxjs';
import { ClickData } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class ClickApiService {
  private clickData$ = new BehaviorSubject<any>({});
  constructor(
    private httpClient: HttpClient
  ) { }


  getCountData(): Observable<ClickData> {
    return  this.httpClient.get<ClickData>(environment.BASE_URL + '/click-count/').pipe(
      tap((data: ClickData)=>{
        this.clickData$.next(data)
      })
    )
  }

  getCountData$():Observable<ClickData> {
    return this.clickData$.asObservable();
  }


  postCountData(ip:string): Observable<any>{
    return  this.httpClient.post<any>(environment.BASE_URL + '/click-count/', {"ip":ip}).pipe(
      tap(()=>{
          this.getCountData().subscribe();

      }
      )
    )

  }

}
