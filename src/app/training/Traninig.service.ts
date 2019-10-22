import { Exercise } from './exercise.model';
import { Injectable, OnInit } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})
export class TrainingService implements OnInit{
    
    selectedEx = new Subject<Exercise>(); 
    exercises = new Subject<Exercise[]>()
    private exercise: Exercise[];
    private runningExercise:Exercise;
    private storeCompletedExercises: Exercise[] = [];
    private storeCancelledExercises: Exercise[] =[];
    constructor(private angularFireStore: AngularFirestore){}
    ngOnInit(){
        
        this.getAvailableTrainigs();
    }
    getAllExercises(){
        return [...this.storeCompletedExercises.slice(),...this.storeCancelledExercises.slice()];
    }
    getAvailableTrainigs(){
        this.angularFireStore.collection('availableExercise').snapshotChanges()
        .pipe(
             map(dataArr =>{
                return dataArr.map((element)=>{
                    return {
                        id: element.payload.doc.id,
                        name: element.payload.doc.data()['name'],
                        calories: element.payload.doc.data()['calories'],
                        duration: element.payload.doc.data()['duration'],
                        
                    }
                })
            } )
        ).subscribe((exercises:Exercise[]) => {
            this.exercise = exercises;
            console.log( this.exercise);
            this.exercises.next(this.exercise.slice());
        })
        
    }
    startExercise(selectedId:string){

        this.runningExercise = this.exercise.find((ex)=>{
           return ex.id === selectedId;
        })
       this.selectedEx.next({...this.runningExercise});
    }
    getSelectedExercise(){
        return {...this.runningExercise};
    }
    completedTrainings(){
        this.storeCompletedExercises.push({...this.runningExercise,
          date: new Date(),
          state: 'completed'
         })
        this.runningExercise = null;
        this.selectedEx.next(null);
    }
    cancelledTrainings(progress:number){
        this.storeCancelledExercises.push({...this.runningExercise,
          duration:this.runningExercise.duration/progress*1000,
          calories:this.runningExercise.duration/progress*1000,
          date: new Date(),
          state: 'cancelled'
         })
        this.runningExercise = null;
        this.selectedEx.next(null);
    }
}