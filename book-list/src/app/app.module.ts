import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { HeaderComponent } from './header/header.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://192.168.21.15:31908/auth',
        realm: 'Testing',
        clientId: 'ashis'
        
      },
      initOptions: {
        // onLoad: 'check-sso',
        // silentCheckSsoRedirectUri:
        //   '${window.location.origin}/assets/silent-check-sso.html'

        onLoad:'login-required',
        flow:'standard'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ListComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
