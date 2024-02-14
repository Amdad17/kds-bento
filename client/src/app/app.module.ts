import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NzButtonModule} from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthRedirectPageComponent } from './pages/auth-redirect-page/auth-redirect-page.component';
import { PageContainerComponent } from './pages/page-container/page-container.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DisplayPageComponent } from './pages/display-page/display-page.component';
import { RuleSetterPageComponent } from './pages/rule-setter-page/rule-setter-page.component';
import { AuthInterceptor } from './interceptors/auth-interceptor/auth-interceptor.service';
import { ErrorInterceptor } from './interceptors/error-interceptor/error-interceptor.service';
import { TokenInterceptor } from './interceptors/token-interceptor/token-interceptor.service';
import { SpashLogoComponent } from './components/spash-logo/spash-logo.component';
import { BaseRuleComponent } from './components/base-rule/base-rule.component';
import { OverrideRuleComponent } from './components/override-rule/override-rule.component';
import { BaseOptionCardComponent } from './components/base-option-card/base-option-card.component';
import { OverrideOptionCardComponent } from './components/override-option-card/override-option-card.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { GraphComponent } from './pages/graph/graph.component';
import { UtilizationCardComponent } from './components/utilization-card/utilization-card.component';


const config: SocketIoConfig = { url: environment.API_URL, options: {} };

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AuthRedirectPageComponent,
    PageContainerComponent,
    DashboardPageComponent,
    DisplayPageComponent,
    RuleSetterPageComponent,
    NavbarComponent,
    SpashLogoComponent,
    BaseRuleComponent,
    OverrideRuleComponent,
    BaseOptionCardComponent,
    OverrideOptionCardComponent,
    OrderCardComponent,
    GraphComponent,
    UtilizationCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CdkDrag,
    CdkDropList,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    NzMenuModule,
    NzSwitchModule,
    NzInputNumberModule,
    NzSpinModule,
    NzIconModule,
    NzDrawerModule,
    NgChartsModule,
    NzBadgeModule,
    NzProgressModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
