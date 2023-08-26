import { Component } from '@angular/core';
import { ObjectId } from 'mongoose';
import Task from 'src/app/models/task.model';
import User from 'src/app/models/user.model';
import { SocketioService } from 'src/app/services/socket/socketio.service';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  users: User[] = [];
  task: Task = new Task(0,"","", 0, false);
  tasks: Task[] = []
  authToken: any
  username: any

  constructor(private userService: UserService, private taskService: TaskService ,private socketService: SocketioService, private router: Router){
    this.socketService.setupSocketConnection();

    this.username = this.userService.getUserName();

    if(userService.isLoggedIn()){

    this.taskService.get().subscribe(data => {
      this.tasks = data as Task[];
      this.sortTasksByPriority();
    },
)
  }
  else{
    this.router.navigate(['/']);
  }
     this.authToken = this.userService.getToken();


    this.socketService.socket.on('newTask', (newTask: Task) => {
      this.tasks.push(newTask);
      this.sortTasksByPriority();
    })

    this.socketService.socket.on('deletedTask', (id: any) => {
      const index = this.tasks.findIndex(i => i._id === id);
      this.tasks.splice(index, 1);
    })

    this.socketService.socket.on('taskDone', (updatedTask: Task) => {
      const taskIndex = this.tasks.findIndex(i => i._id === updatedTask._id);
      if (taskIndex !== -1) {
      this.tasks[taskIndex] = updatedTask;
      }
    })

    this.userService.get().subscribe(data => {
      this.users = data as User[];
      
    })

  }

  sortTasksByPriority() {
    this.tasks.sort((a, b) => b.priority - a.priority);
  }

  handleSubmit(){
    this.socketService.addNewTask(this.task);
  }

  handleDelete(id: any) {
     this.socketService.deleteTask(id);
   }

   isDoneHandler(task: Task){
    this.socketService.taskDone(task);
   }

   async logOutHandler() {
   await this.userService.logOut();
      this.router.navigate(['/']);
    };
   }



