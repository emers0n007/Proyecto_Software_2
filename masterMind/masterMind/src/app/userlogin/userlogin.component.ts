import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements  OnInit{

  todo:any;

  constructor(
    private router:Router
  ) { }
  ngOnInit() {
    console.log('LoginComponent initialized');
  }
  login(usuario: any) {
    // Lógica de inicio de sesión aquí
  }

  validarEdad(edadInput: HTMLInputElement) {
    if (!edadInput.checkValidity()) {
      alert('Por favor, ingrese un número válido con un máximo de dos dígitos.');
    }
  }

  redirectToPlay() {
    // Aquí, utiliza el método navigate para redirigir al componente "play"
    this.router.navigate(['/play']);
  }
}

