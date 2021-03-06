import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';


@Injectable()
export class PostService {

    constructor(private _http: HttpClient, private router: Router, private sharedService: SharedService) { }
    baseUrl = environment.baseUrl;

    postArticle(title: string, url: string, description: string, comment: string) {
        var articleBody = {
            'userId': this.sharedService.user['_id'],
            'title' : title,
            'domain': url,
            'description': description,
            'comment' : comment,
            'username' : this.sharedService.user['username']
        }
        var url = this.baseUrl + '/api/user/' + this.sharedService.user['_id'] + '/article';
        return this._http.post(url, articleBody);
    }

    findAllPosts() {
        return this._http.get(this.baseUrl + '/api/post');
    }

    findPostByUser(userId: string) {
        return this._http.get(this.baseUrl+ '/api/user/'+userId+'/post');
    }

    deletePost(postId: string) {
        var url = this.baseUrl + '/api/post/' + postId;
        return this._http.delete(url);
    }


}