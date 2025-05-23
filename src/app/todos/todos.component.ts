import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { todo } from '../model/todo.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<todo>>([]);
  ngOnInit(): void {
    this.todoService.getTodosFromApi()
    .pipe(
      catchError((error) => {
        console.log(error);
        throw error;
      })
    )
    .subscribe((todos) => {
      this.todoItems.set(todos);
    });
  }
}
