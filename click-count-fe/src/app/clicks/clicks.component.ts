import { ChangeDetectorRef, Component, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import {ClickApiService} from 'src/app/core/services/click-api.service';
import {ClickData, location} from 'src/app/core/models/location.model';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataServiceService } from '../core/services/data-service.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-clicks',
  templateUrl: './clicks.component.html',
  styleUrls: ['./clicks.component.scss']
})
export class ClicksComponent implements OnInit {
  totalCount: number=0 ;
  locations:location[]=[]
  ip: string = ""
  countData: ClickData = {success:true, locations:[], total_count: 0}

  constructor(
    private clickService: ClickApiService,
    private httpClient: HttpClient,
    private message: NzMessageService,
    private dataservice: DataServiceService
  ) { }

  ngOnInit(): void {
    this.getIp();
    this.loadCountData()
  
  }

  getIp(){
    this.httpClient.get('https://api.ipify.org?format=json').subscribe(
      (value:any) => {
        console.log(value)
        this.ip = value.ip;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadCountData(){
    this.clickService.getCountData$().subscribe((res: ClickData)=>{
      console.log(res)
      if (res.success) {
        this.countData = res
      }
      else {
        this.message.error('Something went wrong. Unable to load location data!', {
          nzDuration: 4000
        });
      }
    },(error) => {
      console.log(error);
    });
  }

  OnClick(){
    this.clickService.postCountData(this.ip).subscribe((res)=>{
      if (res.success==false) {
        this.message.error('Something went wrong. Try Again!', {
          nzDuration: 4000
        });
      } 
      // else {
      //   this.loadCountData();
      // }
    })
  }
}
