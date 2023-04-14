import { ChangeDetectorRef, Component, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
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
export class ClicksComponent implements OnInit {
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
    window.addEventListener('onbeforeunload', this.onBeforeUnload);
    this.getIp();
    this.loadCountData()

  }

  onBeforeUnload(){
    console.log(this.currentCount)
    this.clickService.postCountData(this.ip, this.currentCount, this.city, this.country).subscribe(
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
        if (response.city && response.country_name) {
          this.city = response.city
          this.country = response.country_name
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
    this.clickService.getCountData().pipe(delay(6000)).subscribe((res: ClickData)=>{
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

  ngOnDestroy() {
    this.clickService.postCountData(this.ip, this.currentCount, this.city, this.country).subscribe()
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

}
