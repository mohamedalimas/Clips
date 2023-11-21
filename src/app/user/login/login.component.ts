import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userCrdentials = {
    email: '',
    password: ''
  }
  alertMsg = ''
  alertColor = ''
  showAlert = false
  constructor(private auth: AuthService) { }
  async login() {
    this.alertMsg = 'Logging In...'
    this.alertColor = 'blue'
    this.showAlert = true
    try {
      await this.auth.loginuser(this.userCrdentials.email, this.userCrdentials.password)
    } catch (error) {
      console.error(error)
      this.alertMsg = 'Incorrect Email or Password'
      this.alertColor = 'red'
      return
    }
    this.alertMsg = 'Logged In Succsesful'
    this.alertColor = 'green'
  }
}
