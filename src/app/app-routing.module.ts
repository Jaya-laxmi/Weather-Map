import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherforecastComponent } from './weatherforecast/weatherforecast.component';

const routes: Routes = [
  { path:'', redirectTo:'weather', pathMatch:'full'},
  { path:'weather', component: WeatherforecastComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
