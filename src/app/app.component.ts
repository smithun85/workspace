import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Component} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

interface Config {
  header: string;
  url: string;
  footer: string;
  title: string;
  description: string;
  app_url: SafeUrl;
  app_button_text: string;
  charging_station_url: SafeUrl;
  charging_station_button_text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  is_data_loaded: boolean = false;

  url_support_false:string = ''

  title: string = '';
  description: string = '';
  app_url: SafeUrl = '';
  app_button_text: string = '';
  charging_station_url?: SafeUrl;
  charging_station_button_text: string = '';

  header: string = '';
  footer: string = '';
  externalLink?: SafeUrl;
  param_url: string = '';
  params: string = '';

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private router:Router
  ) {
    this.route.queryParamMap.subscribe((params: Params) => {
    let queryParams = JSON.parse(JSON.stringify(params['params']))

      if(!('show_support_page' in queryParams)){
        // If show_support_page-param does not exist then add it with 'true' value.
        queryParams['show_support_page'] = 'true' ;
        console.log(queryParams);
      }
      console.log(queryParams);
      // if no data found in url
      // if (params['keys'].length == 0) {
      //   queryParams = {};
      // }
      // // set default tenant id in case for wrong user input
      let tenant_id = 'default';
      // if (params['keys'].indexOf('tenant_id') > -1) {
      //   tenant_id = queryParams['tenant_id'];
      // }
      // Get static json data based on tenant id
      this.getJsonData(tenant_id).subscribe((response: any) => {
        this.title = response.title;
        this.description = response.description;
        this.app_button_text = response.app_button_text;
        this.charging_station_button_text = response.charging_station_button_text;
        this.param_url = response.prefix_app_url;
        // this.params = response.params;
        // this.app_url = `${this.param_url}${this.params}`;
        // Construct the external link with dynamic query parameters for app_btn
                  // Add query-params in url
        const app_unsafeLink = response.prefix_app_url + '?' + this.serializeQueryParams(queryParams);
      console.log(typeof(queryParams['show_support_page']));
        if(queryParams['show_support_page'] == 'true'){
          console.log(queryParams['show_support_page']);

          // Sanitize the link to prevent XSS
          this.app_url = this.sanitizer.bypassSecurityTrustUrl(app_unsafeLink);
        }
        else{
          window.location.href = app_unsafeLink;
        }
        

        const charging_station_url_unsafeLink =
        response.prefix_app_url + '?' + this.serializeQueryParams(queryParams);
        this.charging_station_url = this.sanitizer.bypassSecurityTrustUrl(
          charging_station_url_unsafeLink
        );
        this.is_data_loaded = true;
      });
    });
  }
  // Helper function to serialize query parameters
  private serializeQueryParams(params: any): string {
    return Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join('&');
  }

  // Call API
  getJsonData(param: string): Observable<any> {
    const filePath = `assets/config/${param}.json`;
    const defaultFilePath = 'assets/config/default.json';

    return this.httpClient.get(filePath).pipe(
      map((response) => response as Config),
      catchError(() => this.httpClient.get(defaultFilePath))
    );
  }
}