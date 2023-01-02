import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private http: HttpClient) { }

  public addRoom(room: any): Observable<any> {
    const url = "https://localhost/spmm-project-final/rooms/add";
    return this.http.post<any>(url, room);
  }

  public updateRoom(room: any): Observable<any> {
    const url = "https://localhost/spmm-project-final/rooms/update";
    return this.http.post<any>(url, room);
  }

  public deleteRoom(room: any): Observable<any> {
    const url = "https://localhost/spmm-project-final/rooms/delete";
    return this.http.post<any>(url, room);
  }

  public getRoom(department: any): Observable<any> {
    const url = `https://localhost/spmm-project-final/rooms/${department}`;
    return this.http.get<any>(url);
  }

  public addAllocation(room: any): Observable<any> {
    const url = "https://localhost/spmm-project-final/roomsAllocation/add";
    return this.http.post<any>(url, room);
  }

  public updateAllocation(room: any): Observable<any> {
    const url = "https://localhost/spmm-project-final/roomsAllocation/update";
    return this.http.post<any>(url, room);
  }

  public deleteAllocation(room: any): Observable<any> {
    const url = "https://localhost/spmm-project-final/roomsAllocation/delete";
    return this.http.post<any>(url, room);
  }

  public getAllocation(room_id: any): Observable<any> {
    const url = `https://localhost/spmm-project-final/roomsAllocation/${room_id}`;
    return this.http.get<any>(url);
  }
}
