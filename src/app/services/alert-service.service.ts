import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor() { }

  public generalAlert(title:string, text:string, icons:any, btnColor:string){
    Swal.fire({
      title:title,
      text:text,
      icon:icons,
      confirmButtonColor:btnColor
    });
  }
 
  
}
