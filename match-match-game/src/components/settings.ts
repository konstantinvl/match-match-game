export class Settings {
  public theme: number;

  public length: number;

  private themeInput: string;

  private lengthInput: string;

  private rootElement: HTMLElement;

  constructor(private readonly rootelement: HTMLElement) {
    this.theme = Math.round(Math.random());
    this.length = 8;
    this.themeInput = '';
    this.lengthInput = '';
    this.rootElement = rootelement;
  }

  pageCreate(): void {
    const set = document.createElement('div');
    set.classList.add('settings');
    const themeLabel = document.createElement('label');
    themeLabel.innerHTML = 'Card theme:';
    const themeform = document.createElement('select');
    themeform.classList.add('themeform');
    const lengthLabel = document.createElement('label');
    lengthLabel.innerHTML = 'Field size:';
    const lengthform = document.createElement('select');
    lengthform.classList.add('lengthform');
    set.append(themeLabel, themeform, lengthLabel, lengthform);
    this.rootElement.append(set);
    set.insertAdjacentHTML(
      'afterbegin',
      `
            <span class="hightitle">Settings:</span>
            `
    );
    themeform.insertAdjacentHTML(
      'afterbegin',
      `
                <option value="0">Animals</option>
                <option value="1">Landmarks</option>
        `
    );
    lengthform.insertAdjacentHTML(
      'afterbegin',
      `
            <option value="2">Baby: 2x2</option>
            <option value="8">Normal: 4x4</option>
            <option value="18">Matcho: 6x6</option>
        `
    );
    themeform.value = this.theme.toString();
    lengthform.value = this.length.toString();
    themeform.onchange = () => {
      this.theme = Number(themeform.value);
    };
    lengthform.onchange = () => {
      this.length = Number(lengthform.value);
    };
  }
}
