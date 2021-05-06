import { Injectable } from '@angular/core';
// import { Audio1 } from '../Audio/1.wav';
@Injectable({
  providedIn: 'root'
})
export class ServService {
  tiles: number = 1;
  colorBlockAll: Array<Object> = [{ color: "white", animate: "large", audio: new Audio() }, { color: "violet", animate: "large", audio: new Audio() }, { color: "pink", animate: "large", audio: new Audio() }, { color: "red", animate: "large", audio: new Audio() }, { color: "blue", animate: "large", audio: new Audio() }, { color: "black", animate: "large", audio: new Audio() }, { color: "brown", animate: "large", audio: new Audio() }, { color: "silver", animate: "large", audio: new Audio() }, { color: "orange", animate: "large", audio: new Audio() }, { color: "green", animate: "large", audio: new Audio() }, { color: "yellow", animate: "large", audio: new Audio() }, { color: "purple", animate: "large", audio: new Audio() }, { color: "gray", animate: "large", audio: new Audio() }, { color: "indigo", animate: "large", audio: new Audio() }, { color: "violet", animate: "large", audio: new Audio() }];
  colorBlock: Array<Object> = [];
  colorSeries: Array<number> = [];
  level: number = 1;
  index: number = 0;
  lastClicked: number;
  playerChoise: Array<number> = [];
  addLevelFlag: boolean = true;
  clickMulti: boolean = true;
  hideStartButton: boolean = true;
  playingAuth: boolean = false;
  failSound: any = new Audio();
  buttonClick: any = new Audio();
  timeWait: number = 1500;
  showLose: boolean = false;
  color: Array<string> = ['Pink','Violet','White','Red', 'Orange', 'Green','Yellow','Blue','Black','Brown', 'Silver', 'Purple', 'Gray', 'Indigo', 'Violet'];
  lastcolor: string;
  uturn : boolean = false;

  constructor() {
    this.initgame();
  }
  initgame(): void {
    this.tiles = +(window.prompt("Enter number of tiles (2-15):  "));
    if(!(this.tiles > 2 && this.tiles<16) ){
      window.alert('Invalid Input Please Try Again!!');
      this.initgame();
    }
    this.colorBlock = this.colorBlockAll.slice(0, this.tiles );
    for (const key in this.colorBlock) {
      this.colorBlock[key]['audio'].src = `./../assets/Audio/${key}.wav`;
      this.colorBlock[key]['audio'].load();
    }
    this.failSound.src = `./../assets/Audio/fail.mp3`;
    this.failSound.load();
    this.buttonClick.src = `./../assets/Audio/button.mp3`;
    this.buttonClick.load();
  }

  runGame(): void {
    
    this.failSound.pause();
    this.hideStartButton = false, this.playingAuth = false;
    this.uturn = false;
    this.getNewIndex();
    setTimeout(() => {
      if (this.index < this.colorSeries.length) {
        this.animateMe(this.colorSeries[this.index]);
        this.index++;
        this.runGame();
      }
      else {
        this.playingAuth = true;
        this.uturn = true;
        this.index = 0;
        this.addLevelFlag = true;
      }
    }, this.timeWait)
  }

  animateMe(color: number): void {
    this.lastClicked ? this.colorBlock[this.lastClicked]['audio'].pause() : undefined;
    this.colorBlock[color]['audio'].play();
    this.colorBlock[color]['animate'] = "small";
    this.clickMulti = false;
    setTimeout(() => {
      this.lastClicked = color;
      this.colorBlock[color]['animate'] = "large";
      this.clickMulti = true;
    }, 500);
  }
  getNewIndex(): void {
    if (this.addLevelFlag) {
      this.colorSeries.push(Math.floor((Math.random() * this.tiles) + 0));
      this.addLevelFlag = false;
      return
    }
  }

  addPlayerChoise(Choise: number): any {
    this.animateMe(Choise);
    this.playerChoise.push(Choise);
    this.lastcolor= this.color[Choise]
    this.checkChoisePath(Choise) ? (this.playerChoise.length == this.colorSeries.length) ? this.levelUp() : undefined : this.restLevel();
  }

  checkChoisePath(Choise: number): boolean {
    return (this.colorSeries[this.playerChoise.length - 1] == Choise);
  }

  restLevel() {
    this.colorSeries = [];
    this.playerChoise = [];
    this.hideStartButton = true;
    this.playingAuth = false;
    this.uturn = false;
    this.failSound.play();
    this.showLose = true;
    setTimeout(() => {
      this.showLose = false;
    }, 2500);
  }

  reset() {
    this.colorSeries = [];
    this.playerChoise = [];
    this.hideStartButton = true;
    this.playingAuth = false;
    this.uturn = false;
    
  }

  levelUp() {
    this.playerChoise = [];
    this.timeWait -= 10;
    this.runGame();
  }

}