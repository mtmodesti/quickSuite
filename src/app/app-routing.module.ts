import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDashboardComponent } from './pages/movie-dashboard/movie-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':movieName', component: MovieDashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
