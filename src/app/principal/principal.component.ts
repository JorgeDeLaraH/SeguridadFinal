import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AlertServiceService } from '../services/alert-service.service';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {

  constructor(private getservice:AuthServiceService, private alertService:AlertServiceService, private router:Router){}
  
  id:any
  nombre:any
  normales=[]
  admin=[]
  superAdmin=[]

  ngOnInit(): void {
    let role="NormalUser"
    this.getservice.getNormalUsers(role).subscribe((res)=>{
      console.log("entre a get role")
      this.normales=res.Respuesta
      console.log(this.normales)
    }
    )

    if (typeof localStorage !== 'undefined') {
      this.id = localStorage.getItem('key');
      if (this.id !== null) {
        this.getservice.getUser(this.id).subscribe((res: any) => {
          this.nombre=res.Nombre
        })
      }
      else {
        this.alertService.generalAlert("Alerta", "Por favor inicia sesión", "warning", "#277FF2")
        this.router.navigate(['login'])
      }
    }

  }
}
