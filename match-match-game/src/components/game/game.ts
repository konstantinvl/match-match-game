import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-component';
import { CardField } from '../card-field/card-field';
import { Card } from '../card/card';

const FLIP_DELAY = 0.9;

enum CARDCLASS {
  WRONG = 'wrong',
  RIGHT = 'right',
}

export class Game extends BaseComponent {
  public readonly cardsField = new CardField();

  private activeCard?: Card | null;

  private isAnimation = false;

  constructor() {
    super();
    this.cardsField = new CardField();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]): void {
    this.cardsField.clear();

    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);
    cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        this.cardHandler(card);
      });
    });
    this.cardsField.addCards(cards);
  }

  stopGame(): void {
    this.cardsField.clear();
  }

  private async cardHandler(card: Card): Promise<void> {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      this.activeCard.element.classList.add(CARDCLASS.WRONG);
      card.element.classList.add(CARDCLASS.WRONG);
      await delay(FLIP_DELAY * 1000);
      await Promise.all([
        this.activeCard.flipToBack(),
        card.flipToBack(),
        this.activeCard.element.classList.remove(CARDCLASS.WRONG),
        card.element.classList.remove(CARDCLASS.WRONG),
      ]);
    } else {
      this.activeCard.element.classList.add(CARDCLASS.RIGHT);
      card.element.classList.add(CARDCLASS.RIGHT);
    }
    this.activeCard = null;
    this.isAnimation = false;
  }
}
