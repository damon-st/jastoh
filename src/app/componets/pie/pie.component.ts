import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  year: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
