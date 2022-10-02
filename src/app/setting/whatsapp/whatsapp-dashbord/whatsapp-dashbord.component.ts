import { Component, OnInit } from '@angular/core';
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-whatsapp-dashbord',
  templateUrl: './whatsapp-dashbord.component.html',
  styleUrls: ['./whatsapp-dashbord.component.scss']
})
export class WhatsappDashbordComponent implements OnInit {

  constructor() { }
  chavronRight = faChevronRight;
  faHomee = faHome;
  branch: any;
  users: any;
  ngOnInit(): void {
  }

  showEmploye(evt: any): any {
    console.log(evt);
  }
}
