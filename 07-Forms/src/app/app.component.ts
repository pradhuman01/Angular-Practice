import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  submitted =false;
  @ViewChild('f', {static:false}) signForm: NgForm;
  defaultQuestion = 'pet';
  youranswer = '';
  genders = ['Male', 'Female'];
  user = {
    username : '',
    email: '',
    question: '',
    answer: '',
    gender: ''
  };
  forbiddenUsernames = ['Chris', 'Anna'];
  signupForm : FormGroup;

  suggestUserName() {
    const suggestedName = 'Superuser';

    //  SetValue changes all the value in form field **** 

    // this.signForm.setValue({
    //   userdata:{
    //     username:suggestedName,
    //     email:''
    //   },
    //   secret:'pet',
    //   answer:'',
    //   gender:'male'
    // });


//  PatchValue changes only selected form field **** 
    this.signForm.form.patchValue({
      userdata:{
        username:suggestedName
      }
    });

  }

  // onSubmit(forms: NgForm){
  //   console.log(forms);
  // }

  // Another Method
  onSubmit(){
    console.log(this.signForm);
    this.submitted = true;
    this.user.username = this.signForm.value.userdata.username;
    this.user.email = this.signForm.value.userdata.email;
    this.user.question = this.signForm.value.secret;
    this.user.answer = this.signForm.value.answer;
    this.user.gender = this.signForm.value.gender;

    // Reset also makes the form untouch and like newly created Form
    this.signForm.reset();
  }



  // Reactive Forms
  // Dont forgot to add ReactiveFormsModule in App Module to work
  ngOnInit(){
    this.signupForm = new FormGroup({
      'reactivedata':new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email':new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender':new FormControl('Male'),
      'hobbies': new FormArray([])

    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    this.signupForm.setValue({
      'reactivedata': {
        'username': 'Max',
        'email': 'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    this.signupForm.patchValue({
      'reactivedata': {
        'username': 'Anna',
      }
    });
  }

  

  onRe_Submit(){
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
