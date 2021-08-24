import { delay } from '../../shared/delay';
import { DataBase } from '../db';

export class Timer {
  public points: number;

  public time: number;

  public timer: HTMLElement;

  public score: HTMLElement;

  public database: DataBase;

  public int?: NodeJS.Timeout;

  private click: number;

  constructor(private readonly rootelement: HTMLElement) {
    this.time = 1;
    this.timer = document.createElement('div');
    this.score = document.createElement('div');
    this.score.classList.add('score');
    this.timer.classList.add('timer');
    this.rootelement.appendChild(this.timer);
    this.rootelement.appendChild(this.score);
    this.points = 0;
    this.database = new DataBase();
    this.click = 0;
  }

  flipped = document.querySelectorAll('.right').length;

  cards = document.querySelectorAll('.card-wrapper').length;

  count(): void {
    this.flipped = document.querySelectorAll('.right').length;
    this.cards = document.querySelectorAll('.card-wrapper').length;
    this.points = this.time * -10 + (this.flipped - this.click) * 50 > 0 ? this.time * -10 + (this.flipped - this.click) * 50 : 0;
    this.score.innerHTML = `${this.points}<span class="mini">points</span>`;
    this.timer.innerHTML = `${this.time}<span class="mini">seconds</span>`;
    this.time++;
  }

  async start(user: string): Promise<void> {
    if (this.rootelement.children.length === 1) {
      this.rootelement.appendChild(this.timer);
      this.rootelement.appendChild(this.score);
    }
    this.click = 0;
    this.points = 0;
    this.time = 0;
    this.score.innerHTML = `${this.points}<span class="mini">points</span>`;
    this.timer.innerHTML = `${this.time}<span class="mini">seconds</span>`;

    await delay(4000);
    document.querySelectorAll('.card-wrapper').forEach((element) => {
      element.addEventListener('transitionend', () => {
        if (document.querySelectorAll('.wrong').length) {
          this.click++;
        }
      });
    });
    this.restartTimer(user);
  }

  restartTimer(user: string): void {
    clearInterval(<NodeJS.Timeout>this.int);
    this.int = setInterval(() => {
      this.count();
      this.endGame(<NodeJS.Timeout>this.int, user);
    }, 1000);
  }

  endGame(int: NodeJS.Timeout, user: string): void {
    if (this.cards === 0) {
      clearInterval(int);
    } else if (this.flipped === this.cards) {
      clearInterval(int);
      const reqGet = this.database.getUser(user);
      reqGet?.addEventListener('success', () => {
        const winner: Record<string, string> = reqGet?.result;
        const points = {
          points: this.points,
        };
        if (Number(winner.points) < Number(points.points) || !Number(winner.points)) {
          Object.assign(winner, points);
          const transaction = this.database.openRequest.result.transaction('users', 'readwrite');
          const users = transaction.objectStore('users');
          const winreq = users.put(winner);
        }
      });
    }
  }
}
