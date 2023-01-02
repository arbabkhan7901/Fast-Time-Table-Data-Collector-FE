import { Component, OnInit } from '@angular/core';
import { CrudService } from "src/app/services/crud/crud.service";
var FormData = require('form-data');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public showEdit = false;
  public department: any;
  public prefix: any;
  public editedRoom: any;
  public id: any;
  public roomID: any;
  public newRoom: any;
  public showSchedular = false;
  public showReserve = false;
  public rooms: any[] = [];
  public reserveRooms: any[] = [];
  public reservedRoom: any;
  public selectedSemester: any;
  public prefixes = [
    { "name": "computer science", "prefix": "CS-" },
    { "name": "civil engineering", "prefix": "CE-" },
    { "name": "electrical engineering", "prefix": "EE-" },
    { "name": "humanity & management", "prefix": "HM-" },
  ];
  public semester = [
    { id: 1, start_date: "2022-08-10", end_date: "2022-12-10", name: "Fall 2022" },
    { id: 2, start_date: "2023-02-10", end_date: "2022-06-10", name: "Spring 2023" }
  ];

  constructor(private crud: CrudService) {
    this.department = localStorage.getItem("user");
    let obj = this.prefixes.find(p => p.name === this.department);
    this.prefix = obj?.prefix;
  }

  ngOnInit(): void {
    this.fetchRooms();
  }

  fetchRooms() {
    const dept = this.prefix.split('-')[0];
    this.crud.getRoom(dept).subscribe((data) => {
      this.rooms = data.list;
    });
  }

  editRoom(id: any) {
    this.showEdit = true;
    this.showSchedular = false;
    this.editedRoom = this.rooms.find(r => r.room_id === id);
    this.id = id;
  }

  updateRoom(name: any, capacity: any) {
    if (this.validateRoom(name, capacity) === true) {
      const dept = this.prefix.split('-')[0];
      var form = new FormData();
      form.append("room_id", this.id);
      form.append("room_code", name);
      form.append("room_capacity", capacity);
      form.append("department_name", dept);
      this.crud.updateRoom(form).subscribe((data) => {
        alert(data.MSG);
        this.fetchRooms();
        this.showEdit = false;
        this.showSchedular = false;
      });
    }
  }

  validateRoom(name: any, capacity: any) {
    if (name === this.prefix || capacity === '' || name === '') {
      alert("Please provide valid data");
      return false;
    }
    if (name.split('-')[0] !== this.prefix.split('-')[0]) {
      alert ("Please add valid prefix in room name!");
      return false;
    }
    if (this.rooms.findIndex(r => r.room_code === name && r.room_id != this.id) !== -1) {
      alert("Room already exist!");
      return false;
    }
    return true;
  }

  cancel() {
    this.showEdit = false;
    this.showSchedular = false;
  }

  deleteRoom(id: any) {
    if (confirm("Are you sure you want to delete this room ?")) {
      var form = new FormData();
      form.append("room_id", id);
      this.crud.deleteRoom(form).subscribe((data) => {
        this.fetchRooms();
        alert(data.MSG);
      });
    }
  }

  reserveRoom(id: any) {
    this.showEdit = false;
    this.showSchedular = true;
    this.fetchAllocations(id);
  }

  fetchAllocations(id: any) {
    this.roomID = id;
    this.crud.getAllocation(id).subscribe((data) => {
      this.reserveRooms = data.list;
    });
  }

  scheduleRoom(semester: any, start_time: any, end_time: any) {
    const sem = this.semester.find(s => s.name === semester);
    if (this.validateDate(sem?.start_date, semester, start_time, end_time, undefined)) {
      var form = new FormData();
      form.append("semester", semester);
      form.append("start_time", start_time);
      form.append("end_time", end_time);
      form.append("start_date", sem?.start_date);
      form.append("end_date", sem?.end_date);
      form.append("room_id", this.roomID);
      this.crud.addAllocation(form).subscribe((data) => {
        this.fetchAllocations(this.roomID);
        alert(data.MSG);
      });
    }
  }

  deleteSchedule(id: any) {
    var form = new FormData();
    form.append("allocation_id", id);
    this.crud.deleteAllocation(form).subscribe((data) => {
      this.fetchAllocations(this.roomID);
      alert(data.MSG);
    });
  }

  updateSchedule(id: any) {
    this.reservedRoom = this.reserveRooms.find(r => r.id === id);
    this.selectedSemester = this.reservedRoom.semester;
    this.showEdit = false;
    this.showSchedular = false;
    this.showReserve = true;
  }

  editReserve(id: any, semester: any, start_time: any, end_time: any) {
    const sem = this.semester.find(s => s.name === semester);
    if (this.validateDate(sem?.start_date, semester, start_time, end_time, id)) {
      var form = new FormData();
      form.append("semester", semester);
      form.append("start_time", start_time);
      form.append("end_time", end_time);
      form.append("start_date", sem?.start_date);
      form.append("end_date", sem?.end_date);
      form.append("room_id", this.roomID);
      form.append("allocation_id", id);
      this.crud.updateAllocation(form).subscribe((data) => {
        this.fetchAllocations(this.roomID);
        alert(data.MSG);
      });
    }
  }

  cancelReservation() {
    this.showSchedular = true;
    this.showEdit = false;
    this.showReserve = false;
  }

  validateDate(start_date: any, semester: any, start_time: any, end_time: any, id: any) {
    var valid = true;
    var Sdate = new Date(start_date + ' ' + start_time);
    var Edate = new Date(start_date + ' ' + end_time);
    if (Edate < Sdate) {
      alert("Please provide valid time slot!");
      return false;
    }
    else {
      for (var i = 0; i < this.reserveRooms.length; i++) {
        if (this.reserveRooms[i].semester == semester && this.reserveRooms[i].id !== id) {
          var SRdate = new Date(this.reserveRooms[i].start_date + ' ' + this.reserveRooms[i].start_time);
          var ERdate = new Date(this.reserveRooms[i].start_date + ' ' + this.reserveRooms[i].end_time);
          if ((Sdate >= SRdate && Sdate <= ERdate) || (Edate >= SRdate && Edate <= ERdate)) {
            alert("Room already reserved at this slot");
            valid = false;
          }
        }
      }
      return valid;
    }
  }
}
