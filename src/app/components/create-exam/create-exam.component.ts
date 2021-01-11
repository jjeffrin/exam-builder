import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamModel } from 'src/app/models/exam';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {

  showErrMsg: boolean = false;
  errMsg: string = "Please fill in all fields";
  examList: any[] = [];
  showModal: boolean = false;
  selectedExam: ExamModel;
  updateCode: string = ''
  updateName: string = ''
  updateDate: string = ''

  constructor(
    private examService: ExamService
  ) { }

  ngOnInit(): void {
    this.getAllExams()
  }

  newExamForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  })

  closeAlert() {
    this.showErrMsg = false;
  }

  getAllExams() {
    this.examService.getExams().toPromise().then((data) => {
      this.examList = data
    }).catch((err) => {
      this.examList = [];
    })
  }

  onSubmit(): void {
    if (!this.newExamForm.invalid) {
      this.showErrMsg = false;
      console.log('then submit form');
      this.examService.addNewExam(this.newExamForm.value).toPromise().then(data => {
        this.errMsg = "User added successfully.";
        this.showErrMsg = true;
        this.getAllExams();
        this.newExamForm.reset();
      }).catch(err => {
        this.errMsg = "User add process failed. Try again.";
        this.showErrMsg = true;
      });
    }
    else {
      this.errMsg = "Please fill in all fields."
      this.showErrMsg = true;
    }
  }

  deleteExam(id: string) {
    this.examService.deleteExamById(id).toPromise().then(data => {
      if (data) {
        this.getAllExams();
      }
    }).catch(err => {
      alert(err)
    })
  }

  updateExam(exam: ExamModel) {
    this.showModal = true;
    this.selectedExam = exam;
    this.updateCode = exam.code;
    this.updateName = exam.name;
    this.updateDate = exam.date;
  }

  closeModal() {
    this.showModal = false;
  }

  saveChanges() {
    this.selectedExam.name = this.updateName;
    this.selectedExam.code = this.updateCode;
    this.selectedExam.date = this.updateDate;
    this.examService.updateExam(this.selectedExam).toPromise().then(() => {
      this.showModal = false;
      this.getAllExams();
    }).catch((err) => {
      alert(err)
    });
  }

}
