import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatTooltipModule } from '@angular/material/tooltip';

import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { EstimationComponent } from './estimation/estimation.component';
import { AppRoutingModule } from './app-routing.module';
import { SessionEditorComponent } from './session-editor/session-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EstimationComponent,
    SessionEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatSliderModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        MatTooltipModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
