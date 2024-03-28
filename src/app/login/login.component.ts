import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { AlertServiceService } from '../services/alert-service.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers:[AuthServiceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private alertService:AlertServiceService
  ) { }

  usuario={
    Usuario: '',
    password:''
  }

  login(){
    let data={
      user: this.usuario.Usuario,
      password: this.usuario.password
    }
    if(data.user!='' && data.password!=''){
      this.authService.authPost(data).subscribe((res: any) => {
        console.log(res)
        if (res.Estatus_Acreditado == true) {
          localStorage.setItem('key',res.Prueba)
          this.router.navigate(['principal'])
        }
        else {
          this.alertService.generalAlert("Alerta","Verifica tus credenciales","warning","#277FF2");
        }
      })
    }
    else{
      this.alertService.generalAlert("Alerta", "Llena los campos por favor","warning","#277FF2");
    }
  }
}
