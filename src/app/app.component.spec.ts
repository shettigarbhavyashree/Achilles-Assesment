import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

class DomHelper{
  private fixture:ComponentFixture<AppComponent>;
  constructor(fixture: ComponentFixture<AppComponent>){
    this.fixture=fixture;
  }

  typeIn(selector:string,value:string | number){
   const input:HTMLInputElement= this.fixture.nativeElement.querySelector(selector);
   input.value=value.toString();
   input.dispatchEvent(new Event('input',{bubbles:true}));
   this.fixture.detectChanges();
  }

  click(selector:string){
    const element= this.fixture.nativeElement.querySelector(selector);
    element.click();
    this.fixture.detectChanges();
   }

   query(selector:string){
    return this.fixture.nativeElement.querySelector(selector);  
   }

}

describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>;
  let component:AppComponent;
  let domHelper:DomHelper;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    domHelper=new DomHelper(fixture);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(' should check whether calculate button is enabled when form is valid', () => {
    //GIVEN component is loaded and form is initialized

    //WHEN form is filled with valid value
    domHelper.typeIn('#number1',10);
    domHelper.typeIn('#number2',15);
    domHelper.typeIn('#number3',20);

    //THEN when calcuate button is enabled
    const button:HTMLButtonElement=domHelper.query('#calculate');
    expect(button.disabled).toBeFalse();
  });

  it(' should check whether calculate button is disabled when form is invalid', () => {
    //GIVEN component is loaded and form is initialized

    //WHEN any of the form field is empty
    domHelper.typeIn('#number1','');
    domHelper.typeIn('#number2',15);
    domHelper.typeIn('#number3',20);

    //THEN when calcuate button is disabled
    const button:HTMLButtonElement=domHelper.query('#calculate');
    expect(button.disabled).toBeTrue();
  });

  it('should display max squared number when form is valid and calculate button is clicked', () => {
    //GIVEN component is loaded and form is initialized

    //WHEN form is field with numeric values and calculate button is clicked
    domHelper.typeIn('#number1',25);
    domHelper.typeIn('#number2',-15);
    domHelper.typeIn('#number3',20);
    domHelper.click('#calculate')

    //THEN it will display max square number
    const h1:HTMLHeadingElement=domHelper.query('#message');
    expect(h1.innerHTML).toEqual('The number with largest square is 25');
  });
  
  it('should display error message when non numeric value is entered in any of form field and calculate button is clicked', () => {
    //GIVEN component is loaded and form is initialized

    //WHEN form is field with alphanumeric values and calculate button is clicked
    domHelper.typeIn('#number1','25a');
    domHelper.typeIn('#number2',-15);
    domHelper.typeIn('#number3',20);
    domHelper.click('#calculate')

    //THEN it will display max square number
    const h1:HTMLHeadingElement=domHelper.query('#message');
    expect(h1.innerHTML).toEqual('At least one invalid number was entered');
  });
});
