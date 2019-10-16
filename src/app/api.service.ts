import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import { Http, Response } from '@angular/http';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
import { map, filter, scan, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  API_URL = 'https://localhost:5001/api';

  constructor( private http: Http ) { }
  

  public getAllTodos(): Observable<Todo[]>{
    //let result =
    return this.http
    .get(this.API_URL + '/todos')
    .pipe(map(responce =>{
      const todos = responce.json();
      console.debug(todos);
      return todos.map((todo) => { 
        console.debug(todo);
        return new Todo(todo);
      });
    }))
    .pipe(catchError(this.handleError));
    
    //return result;
  }

  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get(this.API_URL + '/todos/' + todoId)
      .pipe(map(response => {
        return new Todo(response.json());
      }))
      .pipe(catchError(this.handleError));
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post(this.API_URL + '/todos', todo)
      .pipe(map(response => {
        return new Todo(response.json());
      }))
      .pipe(catchError(this.handleError));
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put(this.API_URL + '/todos/' + todo.id, todo)
      .pipe(map(response => {
        return new Todo(response.json());
      }))
      .pipe(catchError(this.handleError));
  }

  public deleteTodoById(todoId: number): Observable<null> {
    return this.http
      .delete(this.API_URL + '/todos/' + todoId)
      .pipe(map(response => null))
      .pipe(catchError(this.handleError));
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
