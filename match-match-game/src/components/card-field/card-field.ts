import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';

const SHOW_TIME = 5;

export class CardField extends BaseComponent {
  public cards: Card[] = [];

  constructor() {
    super('div', ['card-field']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  appendCards(cards: Card[]): Promise<unknown> {
    const elem = this.element;
    return new Promise((resolve) => {
      this.cards.forEach(async function (card, index) {
        await delay(20 * index);
        elem.appendChild(card.element);
      });
    });
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    /* this.cards.forEach(async (card) => {
      await delay(1000);
      this.element.appendChild(card.element);
    }); */
    this.appendCards(this.cards);

    setTimeout(() => {
      cards.forEach((card) => {
        card.flipToBack();
      });
    }, SHOW_TIME * 1000);
  }
}
