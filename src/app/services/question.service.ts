import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { QuestionModel } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  readonly baseUrl = "https://localhost:44368/api";

  constructor(
    private http: HttpClient
  ) { }

  addNewQuestion(question: QuestionModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/Question", question)
  }

  getQuestions() {
    return this.http.get<any>(this.baseUrl + "/Question");
  }
}
