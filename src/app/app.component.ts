import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/User/home/home.component';
import { FooterComponentComponent } from './components/layout/footer-component/footer-component.component';
import { NavbarComponent } from './components/layout/navbar-component/navbar-component.component';
import { HttpClientModule } from '@angular/common/http';
import { AppTranslateModule } from './app-translate.module'; 
import { TranslateService } from '@ngx-translate/core'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    FooterComponentComponent,
    NavbarComponent,
    HttpClientModule,
    AppTranslateModule 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang() || 'en'; 
    this.translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
  }
}
