import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ApiHandlerService } from './shared/services/api-handler.service';
import { Subscription, catchError, finalize, forkJoin, switchMap, tap } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { NAVIGATION } from './shared/models/navigation .models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public headerData?: string;
  public urlData?: SafeResourceUrl;
  public footerData?: string;
  // public queryParams:any;
  private subscription = new Subscription();
  private subscription1 = new Subscription();
  constructor(private api: ApiHandlerService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    this.subscription1 = this.route.queryParamMap.subscribe((param: any) => {
      let queryParams = param;
      if (queryParams.params.id) {
        this.subscription = this.api.getHeader(queryParams.params.id)
        .subscribe({
          next: (data: NAVIGATION) => {
            console.log(data)
              this.headerData = data.header;
              this.urlData = this.sanitizer.bypassSecurityTrustResourceUrl(data.navigation);
              this.footerData = data.footer;
          }
        });
      }
    })
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }
}
