(()=>{"use strict";var e={344:(e,t,s)=>{s.r(t)},752:function(e,t,s){var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))((function(i,a){function r(e){try{l(n.next(e))}catch(e){a(e)}}function o(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(r,o)}l((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const i=s(496),a=s(838),r=s(229),o=s(860),l=s(27),c=s(122),d=s(597);var h;!function(e){e.START="Start Game",e.PAUSE="Pause Game",e.RESUME="Resume Game"}(h||(h={})),t.App=class{constructor(e){this.rootelement=e,this.nav=document.getElementById("nav"),this.user="",this.pauseEl=document.createElement("div"),this.game=new r.Game,this.rootelement.appendChild(this.game.element),this.timer=new d.Timer(this.game.element),this.database=new a.DataBase,this.setting=new c.Settings(this.game.cardsField.element),document.getElementById("score").addEventListener("click",(()=>this.highscores())),this.startBtn=document.getElementById("start"),this.aboutBtn=document.getElementById("about"),this.settingsBtn=document.getElementById("settings"),this.startBtn.onclick=()=>this.startBtn.innerHTML===h.START?this.start(this.user):this.startBtn.innerHTML===h.PAUSE?this.pause():this.resume(),this.aboutBtn.onclick=()=>this.about(),this.settingsBtn.onclick=()=>this.settings()}start(e){var t;return n(this,void 0,void 0,(function*(){if(e){this.stop();const s=yield fetch("./images.json"),n=(yield s.json())[this.setting.theme],i=n.images.map((e=>`${n.category}/${e}.png`));i.length=this.setting.length,this.game.newGame(i),this.startBtn.innerHTML=h.PAUSE,this.timer.start(e),null===(t=this.nav)||void 0===t||t.classList.remove("invisible")}else this.register()}))}register(){var e;this.startBtn.innerHTML=h.START,null===(e=this.nav)||void 0===e||e.classList.remove("invisible"),this.game.cardsField.clear();const t=new l.Register(this.game.cardsField.element),s=document.getElementById("reg-btn");null==s||s.addEventListener("click",(()=>{t.validateform()&&(this.user=t.email.value,this.database.addUser(t.email.value,t.name.value,t.surname.value),this.start(this.user))}))}stop(){this.game.stopGame(),this.timer.timer.remove(),this.timer.score.remove(),this.startBtn.innerHTML=h.START}pause(){this.pauseEl=document.createElement("div"),this.pauseEl.classList.add("pause"),this.pauseEl.innerHTML="Pause",this.game.cardsField.element.append(this.pauseEl),clearInterval(this.timer.int),this.startBtn.innerHTML=h.RESUME}resume(){this.pauseEl.remove(),this.startBtn.innerHTML=h.PAUSE,this.timer.restartTimer(this.user)}highscores(){this.stop(),new o.Highscores(this.game.cardsField.element)}about(){this.stop(),new i.About(this.game.cardsField.element)}settings(){this.stop(),this.setting.pageCreate()}}},496:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.About=void 0,t.About=class{constructor(e){this.rootelement=e,this.about=document.createElement("div"),this.about.classList.add("about"),e.append(this.about),this.about.innerHTML='\n        <div class="greet">\n             <div class="logo">\n                <span>match</span>\n                <span class="logo__game">game</span>\n                <span>match</span>\n            </div>\n            <span class="greet__text">\n            A game where you should remember cards positions and match them. \n            </span>\n            <span class="greet__text">\n            By pressing Highscores you will see top\n             score for each player who finished the game.\n            </span>\n            <span class="greet__text">\n            By pressing Setting you can setup your game.\n            </span>\n        </div>\n        '}}},583:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaseComponent=void 0,t.BaseComponent=class{constructor(e="div",t=[]){this.element=document.createElement(e),this.element.classList.add(...t)}}},351:function(e,t,s){var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))((function(i,a){function r(e){try{l(n.next(e))}catch(e){a(e)}}function o(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(r,o)}l((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.CardField=void 0;const i=s(680),a=s(583);class r extends a.BaseComponent{constructor(){super("div",["card-field"]),this.cards=[]}clear(){this.cards=[],this.element.innerHTML=""}appendCards(e){const t=this.element;return new Promise((e=>{this.cards.forEach((function(e,s){return n(this,void 0,void 0,(function*(){yield i.delay(20*s),t.appendChild(e.element)}))}))}))}addCards(e){this.cards=e,this.appendCards(this.cards),setTimeout((()=>{e.forEach((e=>{e.flipToBack()}))}),5e3)}}t.CardField=r},977:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Card=void 0;const n=s(583);class i extends n.BaseComponent{constructor(e){super("div",["card-wrapper"]),this.image=e,this.isFlipped=!1,this.element.innerHTML=`\n            <div class="card">\n                <div class="front" \n                style="background-image: url('./images/${e}')">\n                </div>\n                <div class="back"></div>\n            </div>`}flipToBack(){return this.isFlipped=!0,this.flip(!0)}flipToFront(){return this.isFlipped=!1,this.flip(!1)}flip(e=!1){return new Promise((t=>{this.element.classList.toggle("flipped",e),this.element.addEventListener("transitionend",(()=>t()),{once:!0})}))}}t.Card=i},838:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DataBase=void 0,t.DataBase=class{constructor(){this.openRequest=indexedDB.open("konstantinvl",2),this.openRequest.onupgradeneeded=function(){const e=this.result;e.objectStoreNames.contains("users"),e.createObjectStore("users",{keyPath:"email"}).createIndex("points_idx","points")},this.rez=null,this.openRequest.onsuccess=()=>this.createTransactions()}createTransactions(){this.db=this.openRequest.result,this.transaction=this.db.transaction("users","readwrite"),this.users=this.transaction.objectStore("users")}addUser(e,t,s){const n=this.openRequest.result.transaction("users","readwrite").objectStore("users"),i={email:e,name:t,surname:s};let a=!1;const r=n.put(i);return r.onsuccess=function(){a=!0},r.onerror=function(){a=!1},a}getUser(e){return this.openRequest.result.transaction("users","readwrite").objectStore("users").get(e)}}},229:function(e,t,s){var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))((function(i,a){function r(e){try{l(n.next(e))}catch(e){a(e)}}function o(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(r,o)}l((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;const i=s(680),a=s(583),r=s(351),o=s(977);var l;!function(e){e.WRONG="wrong",e.RIGHT="right"}(l||(l={}));class c extends a.BaseComponent{constructor(){super(),this.cardsField=new r.CardField,this.isAnimation=!1,this.cardsField=new r.CardField,this.element.appendChild(this.cardsField.element)}newGame(e){this.cardsField.clear();const t=e.concat(e).map((e=>new o.Card(e))).sort((()=>Math.random()-.5));t.forEach((e=>{e.element.addEventListener("click",(()=>{this.cardHandler(e)}))})),this.cardsField.addCards(t)}stopGame(){this.cardsField.clear()}cardHandler(e){return n(this,void 0,void 0,(function*(){if(!this.isAnimation&&e.isFlipped){if(this.isAnimation=!0,yield e.flipToFront(),!this.activeCard)return this.activeCard=e,void(this.isAnimation=!1);this.activeCard.image!==e.image?(this.activeCard.element.classList.add(l.WRONG),e.element.classList.add(l.WRONG),yield i.delay(900),yield Promise.all([this.activeCard.flipToBack(),e.flipToBack(),this.activeCard.element.classList.remove(l.WRONG),e.element.classList.remove(l.WRONG)])):(this.activeCard.element.classList.add(l.RIGHT),e.element.classList.add(l.RIGHT)),this.activeCard=null,this.isAnimation=!1}}))}}t.Game=c},13:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Greet=void 0,t.Greet=class{constructor(e){this.rootelement=e,this.rootelement.innerHTML='\n        <div class="greet">\n            <span class="hi pattaya">Hi!</span>\n            <span class="greet__text">And welcome to the</span>\n             <div class="logo">\n                <span>match</span>\n                <span class="logo__game">game</span>\n                <span>match</span>\n            </div>\n            <span class="greet__text">\n            In this game you should remember card\'s\n             positions and match them as quickly as posible.\n            </span>\n            <span class="greet__text">\n            But we will start from registering you as a player\n            </span>\n            <div class="enjoybtn pattaya" id="enjoy">Enjoy!</div>\n        </div>\n        '}}},860:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Highscores=void 0;const n=s(838);t.Highscores=class{constructor(e){this.rootelement=e,this.database=new n.DataBase,this.database.openRequest.addEventListener("success",(()=>{this.scores()})),e.insertAdjacentHTML("beforeend",'\n            <div id="highscore-wrapper">\n                <span class="hightitle">Highscores:</span>\n            </div>\n        ')}scores(){const e=this.database.openRequest.result.transaction("users","readwrite").objectStore("users").index("points_idx"),t=null==e?void 0:e.getAll();null==t||t.addEventListener("success",(()=>{const e=document.getElementById("highscore-wrapper");t.result.sort(((e,t)=>t.points-e.points)).forEach((t=>{null==e||e.insertAdjacentHTML("beforeend",`\n                    <div class="highscore">\n                        <div class="highscore_user">\n                            <div>${t.name}</div>\n                            <div>${t.surname}</div>\n                        </div>\n                        <div>${t.points} points</div>\n                    </div>\n                `)}))}))}}},27:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Register=void 0;const i=n(s(536)),a=n(s(310)),r=s(838);t.Register=class{constructor(e){this.rootelement=e,e.insertAdjacentHTML("beforeend",`\n        <form action="" id="register-form">\n      <div class="form-title">Registering a new player</div>\n      <div class="input-wrapper">\n        <label for="name">Name</label>\n        <input type="text" name="name" id="name" required>\n        <div class="checked-wrapper">\n          <img src="${i.default}" alt="" class="valid-img" id="nameVal">\n          <img src="${a.default}" alt="" class="invalid-img name" id="nameInVal">\n        </div>\n      </div>\n      <div class="input-wrapper">\n        <label for="surname">Surname</label>\n        <input type="text" name="surname" id="surname" required>\n        <div class="checked-wrapper">\n          <img src="${i.default}" alt="" class="valid-img" id="surnameVal">\n          <img src="${a.default}" alt="" class="invalid-img" id="surnameInVal">\n        </div>\n      </div>\n      <div class="input-wrapper">\n        <label for="email">E-mail</label>\n        <input type="email" required name="email" id="email">\n        <div class="checked-wrapper">\n          <img src="${i.default}" alt="" class="valid-img" id="emailVal">\n          <img src="${a.default}" alt="" class="invalid-img" id="emailInVal">\n        </div>\n      </div>\n\n      <div class="button-wrapper">\n          <button type="button" id='reg-btn'>Register & Start</button>\n          <button type="reset" id="cansel-btn">Cancel</button>\n      </div>\n  </form>\n         `),this.inputs=document.getElementsByTagName("input"),this.form=document.getElementById("register-form"),this.name=document.getElementById("name"),this.surname=document.getElementById("surname"),this.email=document.getElementById("email"),this.button=document.getElementById("reg-btn"),this.database=new r.DataBase;for(let e=0;e<this.inputs.length;e++)this.inputs[e].minLength=1,this.inputs[e].maxLength=30,this.inputs[e].addEventListener("change",(()=>this.validateform()))}validateform(){var e;const t=document.getElementById("nameVal"),s=document.getElementById("nameInVal"),n=document.getElementById("surnameVal"),i=document.getElementById("surnameInVal"),a=document.getElementById("emailVal"),r=document.getElementById("emailInVal"),o=this.name.value.replace(/([0-9]*)([^0-9~!@#$%*()_—+=|:;"'`<>,.?\\/^]+)([0-9]*)/g,"").length,l=this.surname.value.replace(/([0-9]*)([^0-9~!@#$%*()_—+=|:;"'`<>,.?\\/^]+)([0-9]*)/g,"").length,c=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(null===(e=this.email)||void 0===e?void 0:e.value);return t&&s&&(""!==this.name.value&&0===o?(s.style.visibility="collapse",t.style.visibility="visible"):(s.style.visibility="visible",t.style.visibility="collapse")),n&&i&&(""!==this.surname.value&&0===l?(i.style.visibility="collapse",n.style.visibility="visible"):(i.style.visibility="visible",n.style.visibility="collapse")),a&&r&&(c?(r.style.visibility="collapse",a.style.visibility="visible"):(r.style.visibility="visible",a.style.visibility="collapse")),!(0!==o||0!==l||!c||""===this.surname.value||""===this.name.value)}}},122:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Settings=void 0,t.Settings=class{constructor(e){this.rootelement=e,this.theme=Math.round(Math.random()),this.length=8,this.themeInput="",this.lengthInput="",this.rootElement=e}pageCreate(){const e=document.createElement("div");e.classList.add("settings");const t=document.createElement("label");t.innerHTML="Card theme:";const s=document.createElement("select");s.classList.add("themeform");const n=document.createElement("label");n.innerHTML="Field size:";const i=document.createElement("select");i.classList.add("lengthform"),e.append(t,s,n,i),this.rootElement.append(e),e.insertAdjacentHTML("afterbegin",'\n            <span class="hightitle">Settings:</span>\n            '),s.insertAdjacentHTML("afterbegin",'\n                <option value="0">Animals</option>\n                <option value="1">Landmarks</option>\n        '),i.insertAdjacentHTML("afterbegin",'\n            <option value="2">Baby: 2x2</option>\n            <option value="8">Normal: 4x4</option>\n            <option value="18">Matcho: 6x6</option>\n        '),s.value=this.theme.toString(),i.value=this.length.toString(),s.onchange=()=>{this.theme=Number(s.value)},i.onchange=()=>{this.length=Number(i.value)}}}},597:function(e,t,s){var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))((function(i,a){function r(e){try{l(n.next(e))}catch(e){a(e)}}function o(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(r,o)}l((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Timer=void 0;const i=s(680),a=s(838);t.Timer=class{constructor(e){this.rootelement=e,this.flipped=document.querySelectorAll(".right").length,this.cards=document.querySelectorAll(".card-wrapper").length,this.time=1,this.timer=document.createElement("div"),this.score=document.createElement("div"),this.score.classList.add("score"),this.timer.classList.add("timer"),this.rootelement.appendChild(this.timer),this.rootelement.appendChild(this.score),this.points=0,this.database=new a.DataBase,this.click=0}count(){this.flipped=document.querySelectorAll(".right").length,this.cards=document.querySelectorAll(".card-wrapper").length,this.points=-10*this.time+50*(this.flipped-this.click)>0?-10*this.time+50*(this.flipped-this.click):0,this.score.innerHTML=`${this.points}<span class="mini">points</span>`,this.timer.innerHTML=`${this.time}<span class="mini">seconds</span>`,this.time++}start(e){return n(this,void 0,void 0,(function*(){1===this.rootelement.children.length&&(this.rootelement.appendChild(this.timer),this.rootelement.appendChild(this.score)),this.click=0,this.points=0,this.time=0,this.score.innerHTML=`${this.points}<span class="mini">points</span>`,this.timer.innerHTML=`${this.time}<span class="mini">seconds</span>`,yield i.delay(4e3),document.querySelectorAll(".card-wrapper").forEach((e=>{e.addEventListener("transitionend",(()=>{document.querySelectorAll(".wrong").length&&this.click++}))})),this.restartTimer(e)}))}restartTimer(e){clearInterval(this.int),this.int=setInterval((()=>{this.count(),this.endGame(this.int,e)}),1e3)}endGame(e,t){if(0===this.cards)clearInterval(e);else if(this.flipped===this.cards){clearInterval(e);const s=this.database.getUser(t);null==s||s.addEventListener("success",(()=>{const e=null==s?void 0:s.result,t={points:this.points};(Number(e.points)<Number(t.points)||!Number(e.points))&&(Object.assign(e,t),this.database.openRequest.result.transaction("users","readwrite").objectStore("users").put(e))}))}}}},680:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.delay=void 0,t.delay=function(e){return new Promise((t=>{setTimeout(t,e)}))}},310:(e,t,s)=>{e.exports=s.p+"assets/1583723861a66fb05605.png"},536:(e,t,s)=>{e.exports=s.p+"assets/6f298cca57a5a8b36055.png"}},t={};function s(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,s),a.exports}s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;s.g.importScripts&&(e=s.g.location+"");var t=s.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e})(),(()=>{s(344);const e=s(752),t=s(13);document.body.innerHTML='\n<header id="header">\n      <nav id="nav" class="invisible">\n        <div class="logo">\n          <span>match</span>\n          <span class="logo__game">game</span>\n          <span>match</span>\n        </div>\n        <ul class="navlist">\n          <li id="about">About game</li>\n          <li id="score">Highscores</li>\n          <li id="settings">Settings</li>\n          <li id="start">Start Game</li>\n        </ul>\n      </nav>\n\n</header>\n<main id="app"></main>\n<footer id="footer">\n<div>Icons made by \n<a href="https://www.flaticon.com/authors/roundicons"\n title="Roundicons">Roundicons</a> \nfrom <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>\n</div>\n</div>\n</footer>',window.onload=()=>{const s=document.getElementById("app");if(!s)throw Error("net classa app");const n=new e.App(s),i=(new t.Greet(n.game.cardsField.element),document.getElementById("enjoy"));null==i||i.addEventListener("click",(()=>{n.register()}))}})()})();