import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevelopmentComponent } from './development/development.component';
import { StateBrowserComponent } from './state-browser/state-browser.component';

const routes: Routes = [
  { path: '', component: DevelopmentComponent },
  { path: 'StateBrowser', component: StateBrowserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
