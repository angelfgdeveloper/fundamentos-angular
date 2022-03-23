import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

// Ciclos de vida - OnInit, OnChanges, AfterViewInit, OnDestroy
export class ImgComponent /*implements OnInit, OnChanges, AfterViewInit, OnDestroy */ {

  img: string  = '';

  // Input es para pasar datos desde el padre
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    // console.log('change just img =>', this.img); --
    // code
  }

  @Input() alt: string  = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = './assets/images/default.png';
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    // Before render
    // No run async, await, promise.. -- once time

    // console.log('Constructor', 'imgValue =>', this.img);
    // En el contructor se hacen cosas inmediatas y no asincronas
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //    // Before - during render
  //    // Changes inputs - many times
  //   //  console.log('ngOnChanges', 'imgValue =>', this.img); --
  //   //  console.log('changes', changes); --
  // }

  // ngOnInit(): void {
  //   // Before render
  //   // async - fetch -- once time (Solo una vez)
  //   // console.log('ngOnInit', 'imgValue =>', this.img); --

  //   // this.counterFn = window.setInterval(() => {
  //   //   this.counter += 1;
  //   //   console.log('Run counter');
  //   // }, 1000);
  // }

  // ngAfterViewInit(): void {
  //   // After render
  //   // console.log('ngAfterViewInit'); --
  // }

  // ngOnDestroy(): void {
  //   // delete
  //   // console.log('ngOnDestroy'); --
  //   // window.clearInterval(this.counterFn);
  // }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    // console.log('Log hijo'); --
    this.loaded.emit(this.img);
  }

}
