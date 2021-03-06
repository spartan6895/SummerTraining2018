import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  t={name:"xyz",pr:"L"}
  tasks = [];
  mode= true;
  selectedIndex;

  add(){
    
    let task = {name:this.t.name,status:false,priority:this.t.pr};
    this.http.post('http://localhost:8080/task',task).subscribe((data)=>{
        console.log(data);
        this.tasks.push(data)

    })
    this.t.name="";
    this.t.pr="";


  }
  remove(i,id){
    this.tasks.splice(i,1);
    this.http.delete('http://localhost:8080/task/'+id).subscribe((data)=>{
        console.log(data);
    })
  }
  toggle(task){
    task.status = !task.status;
  }
  pending(){
    let count =0;
    for(let task of this.tasks){
      if(!task.status)count++;
    }
    return count;
  }

  edit(i){
    this.t.name = this.tasks[i].name;
    this.t.pr = this.tasks[i].priority;
    event.stopPropagation();
    this.mode = false;
    this.selectedIndex =i;
  }

  update(){

    this.tasks[this.selectedIndex].name = this.t.name;
    this.tasks[this.selectedIndex].priority = this.t.pr;
    this.t.name="";
    this.t.pr="";
    this.mode = true;

  }

  constructor(private http:HttpClient) { }

  ngOnInit() {
     this.http.get('http://localhost:8080/tasks').subscribe((data:any)=>{
         this.tasks = data;
         console.log(data);
     })
  }

}
