import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginModel } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new LoginModel();
  form: any;


  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  submit() {
    const FormData = this.form.getRawValue();
    const data = {
      email:FormData.email,
      password:FormData.password,
      grant_type:'password',
      scope:'*'
    }

    this.http.post('http://127.0.0.1:8000/api/login', data).subscribe(
      result => {
        console.log('success')
        this.router.navigate(['/home']);
        console.log(result);
        alert('User Login Successfully');

      },
      error => {
        console.log('error');
        console.log(error);
        alert('Wrong Credentials');
      }
    )
      ;
  }


}
