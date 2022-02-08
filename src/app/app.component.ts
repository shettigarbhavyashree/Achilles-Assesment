import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  message:String='';
  
  constructor(private fb:FormBuilder){}

  maxSquareForm=this.fb.group({
    number1:['',Validators.required],
    number2:['',Validators.required],
    number3:['',Validators.required]
  })

  onCalculate(form:FormGroup){      
    if(isNaN(form.value.number1) || isNaN(form.value.number2) || isNaN(form.value.number3)){
      this.message="At least one invalid number was entered";
    } else{  
      // let max=Math.sqrt(Math.max(Math.pow(form.value.number1,2),Math.pow(form.value.number2,2),Math.pow(form.value.number3,2)));
      let max;
      if(Math.abs(form.value.number1)>Math.abs(form.value.number2)){
        if(Math.abs(form.value.number1)>Math.abs(form.value.number3)){
          max=form.value.number1;
        }
        else{
          max=form.value.number3;
        }
      }else{
        if(Math.abs(form.value.number2)>Math.abs(form.value.number3)){
          max=form.value.number2;
        }
        else{
          max=form.value.number3;
        }
      }
      this.message="The number with largest square is "+max;
    }   
  }
}
