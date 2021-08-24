import './index.scss';

// import './fonts.scss';
// import img from "./assets/lololo.png"
import { App } from './app';
import { Greet } from './components/greetings/greet';

document.body.innerHTML = `
<header id="header">
      <nav id="nav" class="invisible">
        <div class="logo">
          <span>match</span>
          <span class="logo__game">game</span>
          <span>match</span>
        </div>
        <ul class="navlist">
          <li id="about">About game</li>
          <li id="score">Highscores</li>
          <li id="settings">Settings</li>
          <li id="start">Start Game</li>
        </ul>
      </nav>

</header>
<main id="app"></main>
<footer id="footer">
<div>Icons made by 
<a href="https://www.flaticon.com/authors/roundicons"
 title="Roundicons">Roundicons</a> 
from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
</div>
</div>
</footer>`;

window.onload = () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('net classa app');
  const app = new App(appElement);
  const hi = new Greet(app.game.cardsField.element);
  const enjoy = document.getElementById('enjoy');
  enjoy?.addEventListener('click', () => {
    app.register();
  });
};
