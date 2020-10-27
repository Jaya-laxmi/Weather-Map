import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from '../weather.service'
import { ErrorService } from '../error.service'

@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrls: ['./weatherforecast.component.scss']
})
export class WeatherforecastComponent implements OnInit, OnDestroy{
  weatherData: any = []
  SearchForm: FormGroup;
  foreCastDetails= ['current', 'hourly', '16Days'];
  selectedForeCast:any;
  value: any;
  weatherdetails: any = [];
  isForecastSelected: boolean = false;
  Searched: boolean = false;
  constructor(private service: WeatherService, private fb: FormBuilder, public errorMssage: ErrorService) { }

  ngOnInit(): void {
    this.SearchForm = this.fb.group({
      seachfield: [''],
      forecast: ['']
    });

    if(localStorage.getItem('weatherdata')){
      this.weatherdetails.push(JSON.parse(localStorage.getItem('weatherdata')))
    }
  }

  appendForeCast(event){
    console.log(event.value);
    this.selectedForeCast = event.value;
    if(this.selectedForeCast){
      this.isForecastSelected = true;
    }
  }

  searchLocation(isSearch){
    if(isSearch){
      this.Searched = true;
    }
    this.SearchForm.controls.seachfield.valueChanges.subscribe(val => {
      console.log(val)
      if(val != "" && val != null){
          if(this.selectedForeCast == 'current'){
            this.service.getCityByCurrent(val).subscribe(res => {
                if(res){
                  console.log(res)
                  this.weatherData = res;
                  this.weatherdetails.push(res);
                  this.weatherdetails = this.removeDuplicates( this.weatherdetails, 'id')
                  localStorage.setItem('weatherdata',  JSON.stringify(this.weatherData))
                }else{
                  this.errorMssage.throwError('response not found')
                }
            }, error =>{
              console.log('server error')
            })
        }else if(this.selectedForeCast == 'hourly'){
          this.service.getCityByHourly(val).subscribe(res => {
            if(res){
              this.weatherData = res;
              this.weatherdetails.push(res)
              this.weatherdetails = this.removeDuplicates( this.weatherdetails, 'id')
              localStorage.setItem('weatherdata',  JSON.stringify(this.weatherData))
            }else{
              this.errorMssage.throwError('response not found')
            }
        }, error =>{
          console.log(error)
        })
        }else if(this.selectedForeCast == '16Days') {
          this.service.getCityBy16Days(val).subscribe(res => {
            if(res){
              this.weatherData = res;
              this.weatherdetails.push(res)
              this.weatherdetails = this.removeDuplicates( this.weatherdetails, 'id')
              localStorage.setItem('weatherdata',  JSON.stringify(this.weatherData))
            }else{
              this.errorMssage.throwError('response not found')
            } 
        }, error =>{
          console.log(error)
        })
        }
    }
  })
  }

  deleteCity(item){
    this.weatherdetails = this.weatherdetails.filter(x => x.name != item.name)
    this.SearchForm.patchValue({
      seachfield: ''
    });
  }

  removeDuplicates(myArray, Prop) {
    return myArray.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[Prop]).indexOf(obj[Prop]) === pos;
    });
}

  ngOnDestroy(){
    localStorage.removeItem('weatherdata');
  }

}
