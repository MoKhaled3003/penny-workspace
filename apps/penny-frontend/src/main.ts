import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { authReducer } from './app/auth/store/auth.reducer';
import { AuthEffects } from './app/auth/store/auth.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects])
  ]
}).catch(err => console.error(err));
