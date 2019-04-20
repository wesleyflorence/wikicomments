import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/client_services/shared.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: string;
  loggedIn: boolean;
  wikipedia_url = 'https://en.wikipedia.org/w/api.php';

  constructor(private router: Router, private sharedService: SharedService) { 
    if (this.sharedService.loggedIn) {
      this.loggedIn = true;
      this.username = this.sharedService.user['username'];
    } else {
      this.loggedIn = false;
    }
  }

  ngOnInit() {
  }

  search() {

  }

}
