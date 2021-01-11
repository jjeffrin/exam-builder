import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamModel } from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  readonly baseUrl = "https://localhost:44368/api";

  constructor(
    private http: HttpClient
  ) { }

  addNewExam(exam: ExamModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/Exam", exam)
  }

  getExams() {
    return this.http.get<any>(this.baseUrl + "/Exam");
  }

  deleteExamById(id: string) {
    return this.http.delete<any>(this.baseUrl + "/Exam", {
      params: {
        id: id
      }
    });
  }

  updateExam(exam: ExamModel) {
    return this.http.put<any>(this.baseUrl + "/Exam", exam);
  }
}
