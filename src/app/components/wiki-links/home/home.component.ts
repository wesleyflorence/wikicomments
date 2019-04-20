import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/client_services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;
  loggedIn: boolean;


  constructor(private router: Router, private sharedService: SharedService) { 
    if (this.sharedService.loggedIn) {
      this.loggedIn = true;
      this.username = this.sharedService.user['username'];
      console.log("LOGGED IN");
    } else {
      this.loggedIn = false;
      console.log("LOGGED OUT");
    }
  }

  ngOnInit() {}

}
