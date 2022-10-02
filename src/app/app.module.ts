import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DevExtremeModule } from 'devextreme-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { DxDataGridModule, DxTemplateModule, DxSelectBoxModule, DxButtonModule, } from 'devextreme-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportService } from './_services/report.service';
import { ImplementService } from './_services/implement.service';
import { MessageSignalrService } from './signalrServices/message-signalr.service';

// =================================================================================

import { LoginComponent } from './login/login/login.component';
import { appRoutes } from './routes';
import { AuthService } from './_services/auth.service';
import { LoadingService } from './_services/loading.service';
import { SecService } from './_services/sec.Service';
import { ClintService } from './_services/clint.service';
import { HomeComponent } from './body/home/home.component';
import { RegisterComponent } from './login/register/register.component';
import { MyprofileComponent } from './body/myprofile/myprofile.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MaincallcenterComponent } from './body/CallCenter/maincallcenter/maincallcenter.component';
import { PayResolver } from './_resolvers/pay.resolver';
import { NumberResolver } from './_resolvers/number.resolver';
import { MapSetting, SmallDataService } from './_services/smallData.service';
import { UpdateUserComponent } from './login/updateUser/updateUser.component';
import { DashbordComponent } from './body/dashbord/dashbord.component';
import { UploadFromExcelComponent } from './body/Secretarial/uploadFromExcel/uploadFromExcel.component';
import { ForgetPasswordComponent } from './login/forgetPassword/forgetPassword.component';
import { OrginizeCustomerComponent } from './body/Secretarial/orginizeCustomer/orginizeCustomer.component';
import { UploadProcessComponent } from './body/Secretarial/uploadProcess/uploadProcess.component';
import { ClintdashbordComponent } from './body/clint/clintdashbord/clintdashbord.component';
import { SendFileComponent } from './body/clint/sendFile/sendFile.component';
import { SendFileReportComponent } from './body/clint/sendFileReport/sendFileReport.component';
import { SettingboxComponent } from './body/CallCenter/settingbox/settingbox.component';
import { ComminactionreportComponent } from './body/clint/comminactionreport/comminactionreport.component';
import { ImplemnttionreportComponent } from './body/clint/implemnttionreport/implemnttionreport.component';
import { MdlreportComponent } from './body/clint/mdlreport/mdlreport.component';
import { PrintTaklefComponent } from './body/CallCenter/print-taklef/print-taklef.component';
import { UpdateFileComponent } from './body/clint/updateFile/updateFile.component';
import { ShardService } from './_shared/shard.service';
import { AccountantreportComponent } from './body/clint/accountantreport/accountantreport.component';
import { MainreportComponent } from './body/mainreport/mainreport.component';
import { BranchreportComponent } from './body/mainreport/branchreport/branchreport/branchreport.component';
import { AboutusComponent } from './body/home/aboutus/aboutus.component';
import { ImplementComponent } from './body/implement/implement/implement.component';
import { SettingimplementComponent } from './body/implement/settingimplement/settingimplement.component';
import { BatchperformanceComponent } from './body/mainreport/batchperformance/batchperformance.component';
import { WhatsappServicesComponent } from './setting/whatsapp/whatsapp-services/whatsapp-services.component';
import { WhatsappSidbarComponent } from './setting/whatsapp/whatsapp-sidbar/whatsapp-sidbar.component';
import { WhatsappChatComponent } from './setting/whatsapp/whatsapp-chat/whatsapp-chat.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { TimeagoModule } from 'ngx-timeago';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WhatsappDashbordComponent } from './setting/whatsapp/whatsapp-dashbord/whatsapp-dashbord.component';

export function tokenGetterr(): any {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent, NavComponent, LoginComponent, HomeComponent, RegisterComponent,
    MyprofileComponent, MaincallcenterComponent, UpdateUserComponent, DashbordComponent,
    UploadFromExcelComponent, ForgetPasswordComponent, OrginizeCustomerComponent,
    UploadProcessComponent, ClintdashbordComponent, SendFileComponent, SendFileReportComponent,
    SettingboxComponent, ComminactionreportComponent, ImplemnttionreportComponent, MdlreportComponent, PrintTaklefComponent,
    UpdateFileComponent, AccountantreportComponent, MainreportComponent, BranchreportComponent, AboutusComponent, ImplementComponent,
    SettingimplementComponent, BatchperformanceComponent, WhatsappServicesComponent, WhatsappSidbarComponent,
    WhatsappChatComponent, WhatsappDashbordComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, DxDataGridModule,
    DxTemplateModule,
    DxSelectBoxModule,
    DxButtonModule,
    MatProgressSpinnerModule,
    PickerModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    BsDatepickerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterr,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: ['localhost:5001/auth']
      }
    }),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    DevExtremeModule, NgxPrintModule,
    MatDialogModule,
    TimeagoModule.forRoot({
    }),
    FontAwesomeModule,
  ],
  providers: [AuthService, SmallDataService, MapSetting, SecService,
    ErrorInterceptorProvider, PayResolver, NumberResolver, Title,
    DatePipe, ClintService, ShardService, LoadingService, ReportService, ImplementService, MessageSignalrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
