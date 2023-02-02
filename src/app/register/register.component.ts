import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import{ FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      user_name: '',
      email: '',
      password: ''
    });
  }
  submit() {
    console.log('submit', this.form.value);
    this.http.post('http://127.0.0.1:8000/api/register', this.form.value).subscribe(
      result => {
        console.log('success')
        this.router.navigate(['/login']);
        console.log(result);
        alert('User Register Successfully');
      },
      error => {
        console.log('error');
        console.log(error);
        alert('Please fill up the following credentials');
      }
    )
      ;
    }
  }



//  registerForm = new FormGroup({
//   firstname: new FormControl(""),
//   lastname: new FormControl(""),
//   email: new FormControl(""),
//   mobile: new FormControl(""),
//   gender: new FormControl(""),
//   pwd: new FormControl(""),
//   rpwd: new FormControl("")

//  });
// registerSubmitted(){
//   console.log(this.registerForm.value);
// }

