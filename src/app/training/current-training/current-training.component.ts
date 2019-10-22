import { Component, OnInit } from '@angular/core';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../Traninig.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  
    progress =0;
    timeUp:any;
    selectedExercise: Exercise;
  constructor(private trainingService: TrainingService) { 
  }
  
  ngOnInit() {
    console.log(this.progress)
    const step = this.trainingService.getSelectedExercise().duration/100*1000;
    this.timeUp = setInterval(()=>{
        
        this.progress = this.progress+ 1;
        if(this.progress >=100){
            this.trainingService.completedTrainings();
            clearInterval(this.timeUp);
        }
        
       },step);
  }
  onStopClick(){
   
    clearInterval(this.timeUp);
  }
}
