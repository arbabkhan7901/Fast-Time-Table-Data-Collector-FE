import { Component, OnInit } from '@angular/core';
import { CrudService } from "src/app/services/crud/crud.service";
var FormData = require('form-data');

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  public rooms: any[] = [];
  public department: any;
  public prefix: any;
  public room_code!: any;
  public room_capacity: any = '';
  public prefixes = [
    { "name": "computer science", "prefix": "CS-" },
    { "name": "civil engineering", "prefix": "CE-" },
    { "name": "electrical engineering", "prefix": "EE-" },
    { "name": "humanity & management", "prefix": "HM-" },
  ];
  constructor(private crud: CrudService) { }

  ngOnInit(): void {
    this.department = localStorage.getItem("user");
    let obj = this.prefixes.find(p => p.name === this.department);
    this.prefix = obj?.prefix;
    this.room_code = this.prefix;
    this.fetchRooms();
  }

  fetchRooms() {
    const dept = this.prefix.split('-')[0];
    this.crud.getRoom(dept).subscribe((data) => {
      this.rooms = data.list;
    });
  }

  addRoom() {
    if (this.validateRoom() === true) {
      var form = new FormData();
      const dept = this.prefix.split('-')[0];
      form.append("room_code", this.room_code);
      form.append("room_capacity", this.room_capacity);
      form.append("department_name", dept);
      this.crud.addRoom(form).subscribe((data) => {
        this.room_capacity = '';
        this.room_code = this.prefix;
        alert(data.MSG);
      });
    }
  }

  validateRoom() {
    if (this.room_code === this.prefix || this.room_capacity === '' || this.room_code === '') {
      alert("Please provide valid data");
      return false;
    }
    if (this.room_code.split('-')[0] !== this.prefix.split('-')[0]) {
      alert ("Please add valid prefix in room name!");
      return false;
    }
    if (this.rooms.findIndex(r => r.room_code === this.room_code) !== -1) {
      alert ("Room already exist!");
      return false;
    }
    return true;
  }
}
