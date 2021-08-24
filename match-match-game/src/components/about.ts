export class About {
  public about: HTMLElement;

  constructor(private readonly rootelement: HTMLElement) {
    this.about = document.createElement('div');
    this.about.classList.add('about');
    rootelement.append(this.about);
    this.about.innerHTML = `
        <div class="greet">
             <div class="logo">
                <span>match</span>
                <span class="logo__game">game</span>
                <span>match</span>
            </div>
            <span class="greet__text">
            A game where you should remember cards positions and match them. 
            </span>
            <span class="greet__text">
            By pressing Highscores you will see top
             score for each player who finished the game.
            </span>
            <span class="greet__text">
            By pressing Setting you can setup your game.
            </span>
        </div>
        `;
  }
}
