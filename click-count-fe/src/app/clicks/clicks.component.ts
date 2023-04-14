import { ChangeDetectorRef, Component, OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import {ClickApiService} from 'src/app/core/services/click-api.service';
import {ClickData, location} from 'src/app/core/models/location.model';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { delay } from 'rxjs';

@Component({
  selector: 'app-clicks',
  templateUrl: './clicks.component.html',
  styleUrls: ['./clicks.component.scss']
})
export class ClicksComponent implements OnInit, OnDestroy {
  totalCount: number=0 ;
  currentCount: number = 0;
  locations:location[]=[];
  ip: string = "";
  countData: ClickData = {success:true, locations:[], total_count: 0};
  city: string = "";
  country: string = "";
  isLoading: boolean = false;
  isIpLoading: boolean = false;
  isLocLoading: boolean = false;
  constructor(
    private clickService: ClickApiService,
    private httpClient: HttpClient,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.currentCount = 0
    // window.addEventListener('beforeunload', this.onBeforeUnload);
    this.getIp();
    this.loadCountData()

  }

  ngOnDestroy(): void {
    this.clickService.postCountData(this.ip, this.currentCount, this.city, this.country).subscribe(()=>{
      location.reload();
    }
    );
  }

  onBeforeUnload(){
    console.log(this.currentCount)
    this.clickService.postCountData(this.ip, this.currentCount, this.city, this.country).subscribe(()=>{
      location.reload();
    }
    );
  }

  getIp(){
    this.isIpLoading = true;
    this.httpClient.get('https://api.ipify.org?format=json').subscribe(
      (value:any) => {
        this.ip = value.ip;
        if (this.ip) {
          this.getLocation(this.ip)
        }
        else {
          this.city = "Anonymous"
          this.country = "Anonymous"
        }
        this.isIpLoading = false;
      },
      (error) => {
        this.city = "Anonymous"
        this.country = "Anonymous"
        this.isIpLoading = false;
      }
    );
  }

  getLocation(ip_address: string){
    this.isLocLoading = true;
    this.httpClient.get(`https://geolocation-db.com/json/${ip_address}/`).subscribe(
    (response:any)=>{
      if (response) {
        if (response.city || response.country_name) {
          this.city = response.city || "Anonymous"
          this.country = response.country_name || "Anonymous"
        } else {
          this.city = "Anonymous"
          this.country = "Anonymous"
        }
      } else {
        this.city = "Anonymous"
        this.country = "Anonymous"
      }
      this.isLocLoading = false;
    },
    (error) => {
      this.city = "Anonymous"
      this.country = "Anonymous"
      this.isLocLoading = false;
    }
    )
  }

  loadCountData(){
    this.isLoading = true;
    this.clickService.getCountData().pipe(delay(0)).subscribe((res: ClickData)=>{
      console.log(res)
      if (res.success) {
        this.countData = res
      }
      else {
        this.message.error('Something went wrong. Unable to load location data!', {
          nzDuration: 4000
        });
      }
      this.isLoading = false;
    },(error) => {
      this.isLoading = false;
    });
  }

  OnClick(){
    this.currentCount+=1
  }


}
