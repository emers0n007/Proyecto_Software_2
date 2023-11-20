import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  cartasArray = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  cartas: Carta[] = [];
  contadorVolteadas = 0;
  carta1: Carta | null = null;
  carta2: Carta | null = null;
  encontradas = 0;
  faltantes = 6;
  tiempo = 0;
  temporizador: any;  // Declaración de temporizador
  intentos = 0;

  constructor() { }

  ngOnInit() {
    this.cargaCartas();
    this.temporizador = setInterval(() => {
      this.tiempo++;
    }, 1000);
  }

  desordenarArrays(arrayX: number[]) {
    let arrayReacomodado = arrayX.sort(() => Math.random() - 0.5);
    return arrayReacomodado;
  }

  cargaCartas() {
    let cartasTemporal = this.desordenarArrays([...this.cartasArray]);
    let modificador = 10;
    let y = 10;
    for (let i = 0; i < 12; i++) {
      if (i == 4 || i == 8) { modificador = 10; }
      if (i < 4) { y = 10; }
      if (i < 8 && i > 3) { y = 130; }
      if (i < 12 && i > 7) { y = 250; }
      let cartaTemporal = new Carta(modificador, y, 100, 100, 'assets/img/back.png', `assets/img/${cartasTemporal[i]}.png`);
      this.cartas.push(cartaTemporal);
      modificador = modificador + 120;
    }
  }

  voltear(carta: Carta) {
    if (!carta.volteada) {
      carta.volteada = true;
      if (this.contadorVolteadas === 0) {
        this.carta1 = carta;
      }
      if (this.contadorVolteadas === 1) {
        this.carta2 = carta;
      }
      this.contadorVolteadas++;
      if (this.contadorVolteadas === 2) {
        this.intentos++;
        if (this.carta1 && this.carta2) {
          if (this.carta1.imagenAtras === this.carta2.imagenAtras) {
            this.encontradas += 0.5;
            this.faltantes -= 0.5;
            if (this.encontradas === 6) {
              clearInterval(this.temporizador);
              const ganasteElement = document.getElementById('ganaste');
              if (ganasteElement) {
                ganasteElement.style.display = 'block';
              }
            }
          } else {
            setTimeout(() => {
              if (this.carta1) {
                this.carta1.volteada = false;
              }
              if (this.carta2) {
                this.carta2.volteada = false;
              }
            }, 1000);
          }
        }
        this.contadorVolteadas = 0;
      }
    }
  }
}

class Carta {
  x: number;
  y: number;
  w: number;
  h: number;
  imagenAtras: string;
  imagenFrente: string;
  volteada: boolean = false;

  constructor(x: number, y: number, w: number, h: number, imagenFrente: string, imagenAtras: string) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imagenAtras = imagenAtras;
    this.imagenFrente = imagenFrente;
  }
}
