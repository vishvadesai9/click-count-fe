import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ClicksComponent } from './clicks/clicks.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CoreModule } from './core/core.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpinModule } from 'ng-zorro-antd/spin';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ClicksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    CoreModule,
    NzAlertModule,
    NzTableModule,
    NzMessageModule,
    NzGridModule,
    NzTypographyModule,
    NzSpinModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
