import { Component, OnInit } from '@angular/core';
import { TrainingService } from './Traninig.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
    ongoingTraining:boolean = false;
    exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription  = this.trainingService.selectedEx.subscribe((ex) => {
    if(ex){
        this.ongoingTraining = true;
    }
    else{
        this.ongoingTraining = false;
    }
    })
  }
  

}
