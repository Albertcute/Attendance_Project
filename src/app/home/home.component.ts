import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  homeObj: HomeObj;
  sortBy: string;
  searchText: string;
  homeArr : HomeObj[] = [];
  user:any;

  constructor(private router: Router,private http:HttpClient) {
     this.homeObj = new HomeObj();
     this.searchText = '';
     this.sortBy = '';
  }

  ngOnInit(){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});


    this.getAllHome();
  }

  logout(){
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  onSave() {
     const isData = localStorage.getItem("_attendance");
     if(isData == null) {
      const newArr = [];
      this.homeObj.HomeId = 0;
      newArr.push(this.homeObj);
      localStorage.setItem("_attendance", JSON.stringify(newArr));
     } else {
      const oldData = JSON.parse(isData);
      const newId =oldData.length + 1;
      this.homeObj.HomeId = newId;
      oldData.push(this.homeObj);
      localStorage.setItem("_attendance", JSON.stringify(oldData));
     }
     this.homeObj = new HomeObj();
     this.getAllHome();
  }
  getAllHome() {
    const isData = localStorage.getItem("_attendance");
    if(isData != null) {
      const localData = JSON.parse(isData);
      this.homeArr = localData;
     }
  }

  onEdit(item: HomeObj) {
    this.homeObj = item;
  }
  onDelete(item: HomeObj) {
    const isData = localStorage.getItem("_attendance");
    if(isData != null) {
      const localData = JSON.parse(isData);
      for (let index = 0; index < localData.length; index++) {
         if (localData[index].HomeId == item.HomeId) {
          localData.splice(0,1);
         }
      }
      localStorage.setItem("_attendance", JSON.stringify(localData));
      this.getAllHome();
     }

  }
  onSearch() {

    const isData = localStorage.getItem("_attendance");
    if(isData != null) {
      const localData = JSON.parse(isData);

      //const filteredData = localData.filter((m:any) => m.FirstName == this.searchText);
     // const filteredData = localData.filter((m:any) => m.FirstName.toLowerCase() == this.searchText.toLowerCase());
      const filteredData = localData.filter((m:HomeObj) => m.FirstName.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
      this.homeArr = filteredData;
    }
  }
  onSort() {
    const isData = localStorage.getItem("_attendance");
    if(isData != null) {
      const localData = JSON.parse(isData);
      if (this.sortBy == "Name") {
        const filteredData = localData.sort((a:any, b: any) => a.FirstName.localeCompare(b.FirstName))
        this.homeArr = filteredData;
      }
      if (this.sortBy == "Technology") {
        const filteredData = localData.sort((a:any, b: any) => a.Technology.localeCompare(b.Technology))
        this.homeArr = filteredData;
      }
    }
  }



}

export class HomeObj {
  HomeId: number;
  FirstName: string;
  LastName: string;
  Course: string;
  Email: string;
  Skill: string;
  Batch: string;
  FewDetails: string;
  constructor() {
    this.HomeId = 0;
    this.FirstName= "";
    this.LastName="";
    this.Course= "";
    this.Email= "";
    this.Skill= "";
    this.Batch= "";
    this.FewDetails= "";
  }
}



