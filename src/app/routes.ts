import { Routes } from '@angular/router';
import { MaincallcenterComponent } from './body/CallCenter/maincallcenter/maincallcenter.component';
import { ShowPdfComponent } from './body/CallCenter/showPdf/showPdf.component';
import { DashbordComponent } from './body/dashbord/dashbord.component';
import { HomeComponent } from './body/home/home.component';
import { MyprofileComponent } from './body/myprofile/myprofile.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { UpdateUserComponent } from './login/updateUser/updateUser.component';
import { AuthGuard } from './_guards/auth.guard';
import { NumberResolver } from './_resolvers/number.resolver';
import { PayResolver } from './_resolvers/pay.resolver';
import { UploadFromExcelComponent } from './body/Secretarial/uploadFromExcel/uploadFromExcel.component';
import { ForgetPasswordComponent } from './login/forgetPassword/forgetPassword.component';
import { OrginizeCustomerComponent } from './body/Secretarial/orginizeCustomer/orginizeCustomer.component';
import { UploadProcessComponent } from './body/Secretarial/uploadProcess/uploadProcess.component';
import { ClintdashbordComponent } from './body/clint/clintdashbord/clintdashbord.component';
import { SendFileReportComponent } from './body/clint/sendFileReport/sendFileReport.component';
import { ComminactionreportComponent } from './body/clint/comminactionreport/comminactionreport.component';
import { ImplemnttionreportComponent } from './body/clint/implemnttionreport/implemnttionreport.component';
import { MdlreportComponent } from './body/clint/mdlreport/mdlreport.component';
import { PrintTaklefComponent } from './body/CallCenter/print-taklef/print-taklef.component';
import { UpdateFileComponent } from './body/clint/updateFile/updateFile.component';
import { AccountantreportComponent } from './body/clint/accountantreport/accountantreport.component';
import { MainreportComponent } from './body/mainreport/mainreport.component';
import { BranchreportComponent } from './body/mainreport/branchreport/branchreport/branchreport.component';
import { AboutusComponent } from './body/home/aboutus/aboutus.component';
import { ImplementComponent } from './body/implement/implement/implement.component';
import { BatchperformanceComponent } from './body/mainreport/batchperformance/batchperformance.component';
import { WhatsappServicesComponent } from './setting/whatsapp/whatsapp-services/whatsapp-services.component';
import { WhatsappDashbordComponent } from './setting/whatsapp/whatsapp-dashbord/whatsapp-dashbord.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'update', component: UpdateUserComponent },
  // { path: 'profile', component: MyprofileComponent },
  { path: 'frgtPass/:id', component: ForgetPasswordComponent },
  { path: 'aboutus', component: AboutusComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'dashbord', component: DashbordComponent },
      { path: 'upload/:id', component: UploadFromExcelComponent },
      { path: 'imp', component: ImplementComponent },
      {
        path: 'calls', component: MaincallcenterComponent,
        resolve: {
          pay: PayResolver,
          numberPhone: NumberResolver,
        }
      },
      { path: 'showPdf', component: ShowPdfComponent },
      { path: 'orginize/:id', component: OrginizeCustomerComponent },
      { path: 'process', component: UploadProcessComponent },
      { path: 'clintdashbord', component: ClintdashbordComponent },
      { path: 'filereport', component: SendFileReportComponent },
      { path: 'ComReport', component: ComminactionreportComponent },
      { path: 'ImpReport', component: ImplemnttionreportComponent },
      { path: 'MdlReport', component: MdlreportComponent },
      { path: 'assigin', component: PrintTaklefComponent },
      { path: 'editFile', component: UpdateFileComponent },
      { path: 'AccReport', component: AccountantreportComponent },
      { path: 'MainReprot', component: MainreportComponent },
      { path: 'BranchReport', component: BranchreportComponent },
      { path: 'BatchPerformance', component: BatchperformanceComponent },
      { path: 'whatsapp', component: WhatsappServicesComponent },
      { path: 'whatsAppDashbord', component: WhatsappDashbordComponent },
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];
