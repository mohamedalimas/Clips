import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import IUser from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Confirmpassword } from '../validators/confirmpassword';
import { Emailtaken } from '../validators/emailtaken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showAlert = false
  alertMessage = ''
  alertColor = 'blue'
  disableSubmit = false

  constructor( 
    private auth :AuthService,
    private emailtaken : Emailtaken
     ) { }

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email],[this.emailtaken.validate]);
  age = new FormControl<number|null>(null, [Validators.required, Validators.min(18), Validators.max(120)]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  confirmPassword = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required, Validators.minLength(13)]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber,
  },[Confirmpassword.match(this.password,this.confirmPassword)]);

  async register() {
    this.disableSubmit = true
    this.alertMessage = 'Please Wait...'
    this.alertColor = 'blue'
    this.showAlert = true
    try {
      await this.auth.registeruser(this.registerForm.value as IUser)
    }
    catch (e) {
      this.alertMessage = 'An Error Occurred Please Try Again Later!'
      this.alertColor = 'red'
      this.disableSubmit = false
      console.error(e)
      return
    }
    this.alertMessage = 'Succses'
    this.alertColor = 'green'
  }
}
