import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
   
  constructor(private http: HttpClient) { }

  getCityByCurrent(cityname): Observable<any>{
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+cityname+'&appid=d4bb8787107b77d45a9fbe24d4f60388');
  }

  getCityByHourly(cityname): Observable<any>{
    return this.http.get('http://pro.openweathermap.org/data/2.5/forecast/hourly?q='+cityname+'&appid=d4bb8787107b77d45a9fbe24d4f60388');
  }

  getCityBy16Days(cityname): Observable<any>{
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+cityname+'&cnt=16&appid=d4bb8787107b77d45a9fbe24d4f60388');
  }
}

