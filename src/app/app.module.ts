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

import { AppComponent } from './app.component';
import { EstimationComponent } from './estimation/estimation.component';

@NgModule({
  declarations: [
    AppComponent,
    EstimationComponent
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
        MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
