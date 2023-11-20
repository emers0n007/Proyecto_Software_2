import { Component, OnInit } from '@angular/core';
import { FlipCardService } from './service/Cards.Service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  constructor(private flipService: FlipCardService) { }

  lastCardsFlipped: Card[] = [];
  cardsArray = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  counterTurned = 0;
  card1: number | null = null;
  card2: number | null = null;

  id = 0;
  found = 0;
  missing = 6;
  attempts = 0;
  time: number = 0;
  intervalTimer: any;
  cards: Card[] = [];

  ngOnInit() {
    console.log('Cards Inicializated');
    this.loadCards();
    this.timer();
  }

  timer() {
    console.log('Temporizador iniciado');
    this.intervalTimer = setInterval(() => {
      this.time++;
    }, 1000);
  }

  unorderArrays(arrayX: number[]) {
    return arrayX.sort(() => Math.random() - 0.5);
  }

  loadCards() {
    const cardsTemporary = this.unorderArrays(this.cardsArray);
    let modifier = 10;
    for (let i = 0; i < 12; i++) {
      if (i == 4 || i == 8) {
        modifier = 10;
      }
      let y = 10;
      if (i > 3 && i < 8) {
        y = 130;
      }
      if (i > 7) {
        y = 250;
      }
      const cardTemporary = new Card(modifier, y, 100, 100, `assets/img/${cardsTemporary[i]}.png`, false, false);
      this.cards.push(cardTemporary);
      modifier = modifier + 120;
    }
  }

  flip(card: Card) {
    if (!card.turned) {

      console.log('Voltear carta:', card);
      if (!card.turned && this.counterTurned < 2) {
        card.turned = true;
        this.lastCardsFlipped.push(card);
      }
      console.log(this.lastCardsFlipped);

      this.counterTurned++;

      if (this.counterTurned === 2) {
        this.card1 = this.lastCardsFlipped[0]?.valor;
        this.card2 = this.lastCardsFlipped[1]?.valor;
        this.attempts++;

        if (this.card1 === this.card2) {

          this.lastCardsFlipped[0].equal = true;
          this.lastCardsFlipped[1].equal = true;

          this.found += 1;
          this.missing -= 1;
          this.lastCardsFlipped = [];
          console.log("found: " + this.found)
          if (this.found === 6) {
            this.id += 1;
            console.log("Cartas Encontradas " + this.found + "- Tiempo total: " + this.time + "- Intentos: " + this.attempts + " Puntaje: %d", calculateScore(this.attempts, this.time));
            const flipCardData = { idResult: this.id, score: calculateScore(this.attempts, this.time), timeUsed: this.time, attemps: this.attempts }
            console.log(flipCardData)
            console.log("Antes de hacer la solicitud al backend");
            this.flipService.saveDataFlipCardGame(flipCardData)
              .subscribe(
                response => console.log("Respuesta del backend:", response),
                error => console.error("Error al llamar al backend:", error)
              );
            clearInterval(this.intervalTimer);
            const ganasteElement = document.getElementById('win');
            if (ganasteElement) {
              ganasteElement.style.display = 'block';
            }
          }

        } else {
          setTimeout(() => {
            this.lastCardsFlipped.forEach(carta => {
              carta.turned = false;
            });
            this.lastCardsFlipped = [];
          }, 1000);
        }

        this.counterTurned = 0;
      }
    }
  }
}

function calculateScore(attempts: number, timeSeconds: number): number {
  const fAttempts = 2; // Ajusta este valor según tus preferencias.
  const fTimeSeconds = 0.5;  // Ajusta este valor según tus preferencias.

  const score = 100 - (attempts * fAttempts + timeSeconds * fTimeSeconds);

  // Asegurarse de que el puntaje esté dentro del rango de 0 a 100.
  return Math.max(0, Math.min(100, score));
}



class Card {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public imageBack: string,
    public turned: boolean,
    public equal: boolean
  ) { }

  get valor(): number {
    const match = this.imageBack.match(/(\d+)\.png$/);
    return match ? parseInt(match[1]) : 0;
  }
}
