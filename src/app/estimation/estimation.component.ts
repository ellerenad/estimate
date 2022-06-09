import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Estimation } from './estimation'

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit {

  @Input() estimation: Estimation | null = null;
  @Output() edit = new EventEmitter<Estimation>(); // TODO Check if required

  constructor() { }

  ngOnInit(): void {  }



  formatEstimationLabel(value: number) {
   switch(value){
     case 1: return 'S';
     case 2: return 'M';
     case 3: return 'L';
     case 4: return 'XL';
     case 5: return 'XXL';
     default: return 'XS'
   }
  }
}
