import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AlertServiceService } from '../services/alert-service.service';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule,FormsModule],
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
  agregarPersona={
    user: '',
    password:'',
    curp:'',
    rol:'',
    password1:'',
    fullname:''
  }
  personaCapturada={
    user: '',
    password:'',
    curp:'',
    rol:'',
    fullname:''
  }
  idBorrar:any
  capDel(id:number){
    this.idBorrar=id
  }
  deleteUser(){
    let data={
      id: this.idBorrar
    }
    console.log("Prueba de id para borrar usuario: ",data)
    this.getservice.deleteUser(data).subscribe((res:any)=>{
      if(res.Informacion_Borrada==true){
        this.alertService.generalAlert("Estatus", "Usuario Eliminado", "success", "#277FF2");
        this.ngOnInit()
      }
    })
  }
  capturar(id:number){
    this.getservice.getUser(id).subscribe((res:any)=>{
      this.personaCapturada.curp=res.Curp
      this.personaCapturada.fullname=res.Nombre
      this.personaCapturada.rol=res.Rol
      this.personaCapturada.user=res.user
      console.log(this.personaCapturada)
    })
  }
  ngOnInit(): void {

    this.getservice.getRoleUsers("NormalUser").subscribe((res)=>{
      this.normales=Object.entries(res.Respuesta)
    })
    this.getservice.getRoleUsers("Admin").subscribe((res)=>{
      this.admin=Object.entries(res.Respuesta)
    })
    this.getservice.getRoleUsers("SuperAdmin").subscribe((res)=>{
      this.superAdmin=Object.entries(res.Respuesta)
    })
    if (typeof localStorage !== 'undefined') {
      this.id = localStorage.getItem('key');
      console.log("Esta es la prueba para obtener el id del local storage: ",this.id)
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
  register(){
    if(this.role=="Admin" || this.role=="SuperAdmin"){
      if(this.agregarPersona.fullname!=''&& this.agregarPersona.user!='' && this.agregarPersona.curp!='' && this.agregarPersona.password!='' && this.agregarPersona.password1!=''  && this.agregarPersona.rol!=''){
        if(this.agregarPersona.password==this.agregarPersona.password1){
          let data={
            user: this.agregarPersona.user,
            curp: this.agregarPersona.curp,
            rol: this.agregarPersona.rol,
            password: this.agregarPersona.password,
            fullname: this.agregarPersona.fullname
          }
          console.log("Esta es la prueba para nueva persona: ",data)
          this.getservice.postNewUser(data).subscribe((res:any)=>{
            if(res.Estatus_Guardado==true){
              this.alertService.generalAlert("Estatus", "Usuario Guardado", "success", "#277FF2");
              this.ngOnInit()
            }else{
              this.alertService.generalAlert("Estatus", "Usuario no Guardado", "error", "#277FF2");
            } 
          })
        }else{
          this.alertService.generalAlert("Alerta", "Contraseñas diferentes", "warning", "#277FF2");  
        }
      }
      else{
        this.alertService.generalAlert("Alerta", "Por favor llena los campos", "warning", "#277FF2");
      }
    }else{
      this.alertService.generalAlert("Estatus", "No puedes modificar por tu nivel", "warning", "#277FF2");
    }
  }

}
