import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../Traninig.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit , AfterViewInit{
    
    @ViewChild(MatSort,{static: false}) sort: MatSort;
    @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

    dataSource = new MatTableDataSource<Exercise>();
    displayedColumns = ["date","name", "duration", "calories", "state"];
  constructor(private  trainingService: TrainingService) { }

  ngOnInit() {
     this.dataSource.data = this.trainingService.getAllExercises();
  }
  ngAfterViewInit(){
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
  onFilterExercise(filterValue){
        this.dataSource.filter = filterValue.trim().toLowerCcase();
        console.log(filterValue);
  }
}
