import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/client_services/user.service';
import { SharedService } from 'src/app/client_services/shared.service';
import { PostService } from 'src/app/client_services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string;
  date: Date;
  user_posts = [{}];

  constructor(private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute, private sharedService: SharedService, private postService: PostService) { 
    this.postService.findPostByUser(this.sharedService.user['_id']).subscribe((data: any) => {
      this.user_posts = data;
    });
  }

  ngOnInit() {
    this.username = this.sharedService.user['username'];
    this.date = this.sharedService.user['dateCreated'];
  }

  logout() {
    this.userService.logout().subscribe((data: any) => {
      this.sharedService.user = {};
      this.sharedService.loggedIn = false;
      this.router.navigate(['/']);
    });
  }

  delete(id: string) {
    this.postService.deletePost(id).subscribe((data: any) => {
      this.postService.findPostByUser(this.sharedService.user['_id']).subscribe((data: any) => {
        this.user_posts = data;
      });
    });

  }

}
