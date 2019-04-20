import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';

const params = new HttpParams({
    fromObject: {
      action: 'opensearch',
      format: 'json',
      origin: '*'
    }
  });

@Injectable()
export class WikipediaSearch { 
    
    constructor(private _http: HttpClient, private router: Router, private sharedService: SharedService) { }
    baseUrl = environment.baseUrl;

    search(searchTerm: string) {
        let wikipedia_url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=0&search=';
        let search_url = wikipedia_url + searchTerm;
        return this._http.get(search_url, {params: params.set('search', searchTerm)});
    }

}
