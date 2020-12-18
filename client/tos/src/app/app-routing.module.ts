import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './@landing-page/landing-page.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: '**', redirectTo: '/landing-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
