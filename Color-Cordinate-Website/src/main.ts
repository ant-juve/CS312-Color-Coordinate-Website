// *DO NOT HAVE TO MODIFY ANYMORE

import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig), provideHttpClient()],
}).catch((err) => console.error(err));
