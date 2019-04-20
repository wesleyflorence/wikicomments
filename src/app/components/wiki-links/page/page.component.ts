import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/client_services/shared.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
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

  ngOnInit() {
  }

}
