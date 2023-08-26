import { Injectable } from '@angular/core';
import { ObjectId } from 'mongoose';
import { io } from 'socket.io-client';
import Task from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  
  socket: any; 

  private url = "http://localhost:5050";

  constructor() { }

  setupSocketConnection(){
   this.socket = io(this.url);
  }

  addNewTask(task: Task){
    this.socket.emit('onTaskAdded', task);
  }

  deleteTask(id: any){
    this.socket.emit('onTaskDeleted', id);
  }

  taskDone(task: Task){
    this.socket.emit('onTaskDone', task);
  }
}
 