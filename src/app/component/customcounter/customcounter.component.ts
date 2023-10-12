import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { customincrement } from 'src/app/shared/store/counter.actions';
import { CounterModel } from 'src/app/shared/store/counter.model';
import { Subscription } from 'rxjs';
import { getchannelname } from 'src/app/shared/store/counter.selector';

@Component({
  selector: 'app-customcounter',
  templateUrl: './customcounter.component.html',
  styleUrls: ['./customcounter.component.css']
})
export class CustomcounterComponent implements OnInit {
  constructor(private store:Store<{ counter:CounterModel}>){

  }

  ngOnInit(): void {
      this.countersubscribe = this.store.select(getchannelname).subscribe(data =>{
      this.channelname = data;
      console.log('custom counter');
    })
  }

  countersubscribe!:Subscription;
  counterinput!:number;
  actiontype!:string;
  channelname='';

  OnIncrement(){
    this.store.dispatch(customincrement({ value: +this.counterinput, action:this.actiontype}));
  }

}
