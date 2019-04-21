import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/client_services/shared.service';
import { PostService } from 'src/app/client_services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;
  loggedIn: boolean;
  all_posts = [{}];


  constructor(private router: Router, private sharedService: SharedService, private postService: PostService) { 
    this.postService.findAllPosts().subscribe((data: any) => {
      this.all_posts = data;
      this.all_posts.reverse();
    });

    if (this.sharedService.loggedIn) {
      this.loggedIn = true;
      this.username = this.sharedService.user['username'];
    } else {
      this.loggedIn = false;
    }
  }

  ngOnInit() {}

}
