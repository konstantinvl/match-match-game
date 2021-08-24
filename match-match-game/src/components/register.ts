import checked from '../assets/checked.png';
import cancel from '../assets/cancel.png';
import { DataBase } from './db';

export class Register {
  public form: HTMLElement | null;

  public name: HTMLInputElement;

  public surname: HTMLInputElement;

  public email: HTMLInputElement;

  public button: HTMLInputElement;

  public inputs: HTMLCollectionOf<HTMLInputElement> | null;

  private database: DataBase;

  constructor(private rootelement: HTMLElement) {
    rootelement.insertAdjacentHTML(
      'beforeend',
      `
        <form action="" id="register-form">
      <div class="form-title">Registering a new player</div>
      <div class="input-wrapper">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" required>
        <div class="checked-wrapper">
          <img src="${checked}" alt="" class="valid-img" id="nameVal">
          <img src="${cancel}" alt="" class="invalid-img name" id="nameInVal">
        </div>
      </div>
      <div class="input-wrapper">
        <label for="surname">Surname</label>
        <input type="text" name="surname" id="surname" required>
        <div class="checked-wrapper">
          <img src="${checked}" alt="" class="valid-img" id="surnameVal">
          <img src="${cancel}" alt="" class="invalid-img" id="surnameInVal">
        </div>
      </div>
      <div class="input-wrapper">
        <label for="email">E-mail</label>
        <input type="email" required name="email" id="email">
        <div class="checked-wrapper">
          <img src="${checked}" alt="" class="valid-img" id="emailVal">
          <img src="${cancel}" alt="" class="invalid-img" id="emailInVal">
        </div>
      </div>

      <div class="button-wrapper">
          <button type="button" id='reg-btn'>Register & Start</button>
          <button type="reset" id="cansel-btn">Cancel</button>
      </div>
  </form>
         `
    );
    this.inputs = document.getElementsByTagName('input');
    this.form = document.getElementById('register-form');
    this.name = <HTMLInputElement>document.getElementById('name');
    this.surname = <HTMLInputElement>document.getElementById('surname');
    this.email = <HTMLInputElement>document.getElementById('email');
    this.button = <HTMLInputElement>document.getElementById('reg-btn');
    this.database = new DataBase();
    for (let i = 0; i < this.inputs.length; i++) {
      this.inputs[i].minLength = 1;
      this.inputs[i].maxLength = 30;
      this.inputs[i].addEventListener('change', () => this.validateform());
    }
  }

  validateform(): boolean {
    const Nameregex = /([0-9]*)([^0-9~!@#$%*()_—+=|:;"'`<>,.?\\/^]+)([0-9]*)/g;
    const Surnameregex = /([0-9]*)([^0-9~!@#$%*()_—+=|:;"'`<>,.?\\/^]+)([0-9]*)/g;
    const Emailregex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const nameVal = document.getElementById('nameVal');
    const nameInVal = document.getElementById('nameInVal');
    const surnameVal = document.getElementById('surnameVal');
    const surnameInVal = document.getElementById('surnameInVal');
    const emailVal = document.getElementById('emailVal');
    const emailInVal = document.getElementById('emailInVal');

    const nameCheck = this.name.value.replace(Nameregex, '').length;
    const surnameCheck = this.surname.value.replace(Surnameregex, '').length;
    const emailCheck = Emailregex.test(<string>this.email?.value);

    if (nameVal && nameInVal) {
      if (this.name.value !== '' && nameCheck === 0) {
        nameInVal.style.visibility = 'collapse';
        nameVal.style.visibility = 'visible';
      } else {
        nameInVal.style.visibility = 'visible';
        nameVal.style.visibility = 'collapse';
      }
    }

    if (surnameVal && surnameInVal) {
      if (this.surname.value !== '' && surnameCheck === 0) {
        surnameInVal.style.visibility = 'collapse';
        surnameVal.style.visibility = 'visible';
      } else {
        surnameInVal.style.visibility = 'visible';
        surnameVal.style.visibility = 'collapse';
      }
    }
    if (emailVal && emailInVal) {
      if (emailCheck) {
        emailInVal.style.visibility = 'collapse';
        emailVal.style.visibility = 'visible';
      } else {
        emailInVal.style.visibility = 'visible';
        emailVal.style.visibility = 'collapse';
      }
    }

    if (nameCheck === 0 && surnameCheck === 0 && emailCheck && this.surname.value !== '' && this.name.value !== '') {
      return true;
    }
    return false;
  }
}
