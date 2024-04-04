import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTskValue : string = '';


  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask(){
    this.crudService.getAllTask().subscribe(res=>{
      this.taskArr = res;
    }, err=>{
      alert("Unable to get the list of tasks");
    })
  }

  addTask(){
    this.taskObj.task_name = this.addTskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTskValue = '';
    }, err => {
      alert(err);
    })
  }

  editTask(){
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err =>{
      alert("Failed to update the task");
    })
  }

  deleteTask(etask: Task){
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to delete Task")
    })
  }

}
