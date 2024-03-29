import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AlertServiceService } from '../services/alert-service.service';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';


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
  normales: any
  admin: any
  superAdmin: any
  role=''
  mostrarNormal:any
  mostrarAdmin:any
  mostrarSuper:any
  mostrarBotones:any
  ngOnInit(): void {

    this.getservice.getNormalUsers("NormalUser").subscribe((res)=>{
      this.normales=Object.entries(res.Respuesta)
    })
    this.getservice.getNormalUsers("Admin").subscribe((res)=>{
      this.admin=Object.entries(res.Respuesta)
    })
    this.getservice.getNormalUsers("SuperAdmin").subscribe((res)=>{
      this.superAdmin=Object.entries(res.Respuesta)
    })
    if (typeof localStorage !== 'undefined') {
      this.id = localStorage.getItem('key');
      if (this.id !== null) {
        this.getservice.getUser(this.id).subscribe((res: any) => {
          this.nombre=res.Nombre
          this.role=res.Rol
          switch(this.role){
            case 'NormalUser':{
              this.mostrarNormal=true
              this.mostrarAdmin=false
              this.mostrarSuper=false
              this.mostrarBotones=false
              break;
            }
            case 'Admin':{
              this.mostrarNormal=true
              this.mostrarAdmin=true
              this.mostrarSuper=false
              this.mostrarBotones=true
              break;
            }
            case 'SuperAdmin':{
              this.mostrarNormal=true
              this.mostrarAdmin=true
              this.mostrarSuper=true
              this.mostrarBotones=true
              break;
            }
            default:{
              alert("Opcion no valida")
            }   
          }

        })
      }
      else {
        this.alertService.generalAlert("Alerta", "Por favor inicia sesión", "warning", "#277FF2")
        this.router.navigate(['login'])
      }
    }

  }
}
