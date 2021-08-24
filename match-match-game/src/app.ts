import { About } from './components/about';
import { DataBase } from './components/db';
import { Game } from './components/game/game';
import { Highscores } from './components/highscores';
import { Register } from './components/register';
import { Settings } from './components/settings';
import { Timer } from './components/timer&score/timnsc';
import { ImageCategory } from './models/category-model';
import { delay } from './shared/delay';

enum GMAECONTROL {
  START = 'Start Game',
  PAUSE = 'Pause Game',
  RESUME = 'Resume Game',
}

export class App {
  public readonly game: Game;

  public database: DataBase;

  public setting: Settings;

  public timer: Timer;

  private startBtn: HTMLElement;

  private aboutBtn: HTMLElement;

  private settingsBtn: HTMLElement;

  constructor(private readonly rootelement: HTMLElement) {
    this.game = new Game();
    this.rootelement.appendChild(this.game.element);
    this.timer = new Timer(this.game.element);
    this.database = new DataBase();
    this.setting = new Settings(this.game.cardsField.element);
    const highscoresBTN = <HTMLElement>document.getElementById('score');
    highscoresBTN.addEventListener('click', () => this.highscores());
    this.startBtn = <HTMLElement>document.getElementById('start');
    this.aboutBtn = <HTMLElement>document.getElementById('about');
    this.settingsBtn = <HTMLElement>document.getElementById('settings');
    this.startBtn.onclick = () => {
      if (this.startBtn.innerHTML === GMAECONTROL.START) {
        return this.start(this.user);
      }
      if (this.startBtn.innerHTML === GMAECONTROL.PAUSE) {
        return this.pause();
      }
      return this.resume();
    };
    this.aboutBtn.onclick = () => this.about();
    this.settingsBtn.onclick = () => this.settings();
  }

  nav = document.getElementById('nav');

  user = '';

  async start(user: string): Promise<void> {
    if (user) {
      this.stop();
      const res = await fetch('./images.json');
      const categories: ImageCategory[] = await res.json();
      const cat = categories[this.setting.theme];
      const images = cat.images.map((name) => `${cat.category}/${name}.png`);
      images.length = this.setting.length;
      this.game.newGame(images);
      this.startBtn.innerHTML = GMAECONTROL.PAUSE;
      this.timer.start(user);
      this.nav?.classList.remove('invisible');
    } else {
      this.register();
    }
  }

  register(): void {
    this.startBtn.innerHTML = GMAECONTROL.START;
    this.nav?.classList.remove('invisible');
    this.game.cardsField.clear();
    const reg = new Register(this.game.cardsField.element);
    const submit = document.getElementById('reg-btn');

    submit?.addEventListener('click', () => {
      if (reg.validateform()) {
        this.user = <string>reg.email.value;
        this.database.addUser(reg.email.value, reg.name.value, reg.surname.value);

        this.start(this.user);
      }
    });
  }

  stop(): void {
    this.game.stopGame();
    this.timer.timer.remove();
    this.timer.score.remove();
    this.startBtn.innerHTML = GMAECONTROL.START;
  }

  pauseEl = document.createElement('div');

  pause(): void {
    this.pauseEl = document.createElement('div');
    this.pauseEl.classList.add('pause');
    this.pauseEl.innerHTML = 'Pause';
    this.game.cardsField.element.append(this.pauseEl);
    clearInterval(<NodeJS.Timeout>this.timer.int);
    this.startBtn.innerHTML = GMAECONTROL.RESUME;
  }

  resume(): void {
    this.pauseEl.remove();
    this.startBtn.innerHTML = GMAECONTROL.PAUSE;
    this.timer.restartTimer(this.user);
  }

  highscores(): void {
    this.stop();
    const elem = new Highscores(this.game.cardsField.element);
  }

  about(): void {
    this.stop();
    const elem = new About(this.game.cardsField.element);
  }

  settings(): void {
    this.stop();
    this.setting.pageCreate();
  }
}
