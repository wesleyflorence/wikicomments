import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/client_services/shared.service';
import { NgForm } from '@angular/forms';
import { WikipediaSearch } from 'src/app/client_services/wikipedia.search.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;
  username: string;
  loggedIn: boolean;
  searchTerm: string;
  results = [];

  constructor(private router: Router, private sharedService: SharedService, private wikipediaSearch: WikipediaSearch) { 
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
    this.searchTerm = this.searchForm.value.wikisearch;
    this.wikipediaSearch.search(this.searchTerm).subscribe((data: any) => {
      // console.log(data);
      let len = data[1].length;
      for (var i = 0; i<len; i++) {
        this.results[i] = {
          'title' : data[1][i], 
          'domain': data[3][i], 
          'description': data[2][i]
        };
      }
      console.log(this.results);
    });
  }

}
