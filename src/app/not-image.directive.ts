import { Directive, ElementRef, HostListener } from '@angular/core';
import { element } from 'protractor';

@Directive({
  selector: '[appNotImage]'
})
export class NotImageDirective {

  constructor(private elemento: ElementRef) { }

  @HostListener('error')
  loadImage():  void{
    this.elemento.nativeElement.src = 'assets/images/jastho.jpeg';
  }
}
