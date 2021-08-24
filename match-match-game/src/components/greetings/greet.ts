export class Greet {
  constructor(private readonly rootelement: HTMLElement) {
    this.rootelement.innerHTML = `
        <div class="greet">
            <span class="hi pattaya">Hi!</span>
            <span class="greet__text">And welcome to the</span>
             <div class="logo">
                <span>match</span>
                <span class="logo__game">game</span>
                <span>match</span>
            </div>
            <span class="greet__text">
            In this game you should remember card's
             positions and match them as quickly as posible.
            </span>
            <span class="greet__text">
            But we will start from registering you as a player
            </span>
            <div class="enjoybtn pattaya" id="enjoy">Enjoy!</div>
        </div>
        `;
  }
}
