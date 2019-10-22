import { Component, OnInit} from '@angular/core';
import { TrainingService } from '../Traninig.service';
import { Exercise } from '../exercise.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

    
    avialableTrainings: Exercise[];
    exercisesSubscription: Subscription;
  constructor(private  traningServsice: TrainingService, private angularFireStore: AngularFirestore) { }

  ngOnInit() {
    // this.avialableTrainings = this.traningServsice.getAvailableTrainigs();
     //this.angularFireStore.collection('availableExercise').valueChanges().subscribe((data)=> {
        this.exercisesSubscription = this.traningServsice.exercises.subscribe((exercise) => {
            this.avialableTrainings = exercise;
            console.log(this.avialableTrainings);
            console.log(typeof this.avialableTrainings);
            console.log(Array.isArray(this.avialableTrainings));
        }) 
        this.traningServsice.getAvailableTrainigs();
  }
  onStartOfTraining(form: NgForm){
      this.traningServsice.startExercise(form.value.training);
  }


}
