import {Injectable} from '@angular/core';
import {Todo} from './todo'
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable()
export class TodoDataService {

  todos: Todo[] = [];

  //private url = 'https://localhost:5001/api/todos';

  constructor(private api: ApiService) {}

  // ngOnInit(){
  //   this.getAllTodos();
  //   console.log('todos :', this.todos);
  // }

  addTodo(todo: Todo): Observable<Todo>{
    
    return this.api.createTodo(todo);
    // if (!todo.id) {
    //   todo.id = ++this.lastId;
    // }
    // this.todos.push(todo)
    // return this;
  }

  deleteTodoById(id: number, ): Observable<Todo> {
    return this.api.deleteTodoById(id);
    // this.todos = this.todos
    //   .filter(todo => todo.id !== id);
    // return this;
  }

  updateTodoById(todo: Todo): Observable<Todo> {
    return this.api.updateTodo(todo);
    // let todo = this.getTodoById(id);
    // if (!todo) {
    //   return null;
    // }
    // Object.assign(todo, values);
    // return todo;
  }

  getAllTodos(): Observable<Todo[]> {
    let result = this.api.getAllTodos();
    console.debug();
    return result;
    //this.http.get('https://localhost:5001/api/todoitems').pipe(map(Todo => Todo));
    //return this.todos;

    //return this.http.get(this.url).pipe(map(res => res.json()));
  }

  getTodoById(id: number): Observable<Todo> {
    return this.api.getTodoById(id);
    // return this.todos
    //   .filter(todo => todo.id === id)
    //   .pop();
    // let item : Todo;
    // this.http.get('https://localhost:5001/api/todoitems/' + id.toString)
    // this.http.get('https://localhost:5001/api/todoitems/' + id.toString)
    // .subscribe((data:Todo) => item = data);
    // return item;
  }

  toggleTodoComplete(todo: Todo) {
    todo.isComplete = !todo.isComplete;
    return this.api.updateTodo(todo);
  }
}
