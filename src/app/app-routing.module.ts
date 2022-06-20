import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component'
import { SessionEditorComponent } from './session-editor/session-editor.component'
import { LandingComponent } from './landing/landing.component'


const routes: Routes = [
  { path: 'session', component: SessionEditorComponent },
  { path: '**', component: LandingComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
