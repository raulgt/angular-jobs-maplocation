import { Component, Input, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user: string;

  constructor(private loginService: LoginServiceService) { }

  ngOnInit(): void {
  }

  logout(){
     this.loginService.logout();
  }

}
