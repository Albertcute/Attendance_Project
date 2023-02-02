import { Component,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  adminObj: AdminObj;
  sortBy: string;
  searchText: string;
  adminArr : AdminObj[] = [];
user:any;

  constructor(private router: Router,private http:HttpClient) {
     this.adminObj = new AdminObj();
     this.searchText = '';
     this.sortBy = '';
  }
 url:SafeUrl=''

  onCodeChange(url: SafeUrl){
    console.log(url);
    this.url = url;
  }

  ngOnInit(){
const headers = new HttpHeaders({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});
    this.http.get('http://127.0.0.1:8000/user',{headers:headers}).subscribe(
      result=>console.log(result)
    )
    this.getAllAdmin();
  }

  logout(){
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  onSave() {
     const isData = localStorage.getItem("EmpData");
     if(isData == null) {
      const newArr = [];
      this.adminObj.AdminId = 0;
      newArr.push(this.adminObj);
      localStorage.setItem("EmpData", JSON.stringify(newArr));
     } else {
      const oldData = JSON.parse(isData);
      const newId =oldData.length + 1;
      this.adminObj.AdminId = newId;
      oldData.push(this.adminObj);
      localStorage.setItem("EmpData", JSON.stringify(oldData));
     }
     this.adminObj = new AdminObj();
     this.getAllAdmin();
  }
  getAllAdmin() {
    const isData = localStorage.getItem("EmpData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      this.adminArr = localData;
     }
  }

  onEdit(item: AdminObj) {
    this.adminObj = item;
  }
  onDelete(item: AdminObj) {
    const isData = localStorage.getItem("EmpData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      for (let index = 0; index < localData.length; index++) {
         if (localData[index].AdminId == item.AdminId) {
          localData.splice(0,1);
         }
      }
      localStorage.setItem("EmpData", JSON.stringify(localData));
      this.getAllAdmin();
     }

  }
  onSearch() {

    const isData = localStorage.getItem("EmpData");
    if(isData != null) {
      const localData = JSON.parse(isData);

      //const filteredData = localData.filter((m:any) => m.FirstName == this.searchText);
     // const filteredData = localData.filter((m:any) => m.FirstName.toLowerCase() == this.searchText.toLowerCase());
      const filteredData = localData.filter((m:AdminObj) => m.Name.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
      this.adminArr = filteredData;
    }
  }
  onSort() {
    const isData = localStorage.getItem("EmpData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      if (this.sortBy == "Name") {
        const filteredData = localData.sort((a:any, b: any) => a.Name.localeCompare(b.Name))
        this.adminArr = filteredData;
      }
      if (this.sortBy == "Technology") {
        const filteredData = localData.sort((a:any, b: any) => a.Technology.localeCompare(b.Technology))
        this.adminArr = filteredData;
      }
    }
  }



}

export class AdminObj {
  AdminId: number;
  Name: string;
  Course: string;
  Email: string;
  Skill: string;
  Batch: string;

  constructor() {
    this.AdminId = 0;
    this.Name = "";
    this.Course= "";
    this.Email= "";
    this.Skill= "";
    this.Batch= "";

  }
}


