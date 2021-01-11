import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  showAlertMsg: boolean = false;
  alertMsg: string = '';

  constructor(
    private questionService: QuestionService
  ) { }
  
  ngOnInit(): void {
  }

  newQuestionForm = new FormGroup({
    content: new FormControl('', Validators.required),
    addedBy: new FormControl(localStorage.getItem('examBuilderUserName'), Validators.required),
    typeCode: new FormControl(0, Validators.min(1)),
    typeDescription: new FormControl(''),
    options: new FormControl(''),
    examId: new FormControl('')
  })

  onSubmit() {
    if (!this.newQuestionForm.invalid && this.newQuestionForm.dirty) {
      if (this.newQuestionForm.value.typeCode != 1) {
        this.processOptions(this.newQuestionForm.value.options);
      }
      this.AttachTypeDescrToFormData(); 
      this.questionService.addNewQuestion(this.newQuestionForm.value).toPromise().then((data) => {
        this.displayAlertMsg("Question added successfully.")
        this.newQuestionForm.reset()
      }).catch((err) => {
        console.log(err)
        this.displayAlertMsg("Problem in adding question. Please try again.")
      })   
    }
    else {
      this.displayAlertMsg("Please fill all required fields.")
    }
    console.log(this.newQuestionForm.value)
  }

  processOptions(options: string) {
    this.newQuestionForm.patchValue({ options: options.split("~~") }) 
  }

  AttachTypeDescrToFormData(): void {
    let formData = this.newQuestionForm.value;
    let typeCd = formData.typeCode;
    if (typeCd == 1) {
      this.newQuestionForm.patchValue({ typeDescription: "This is a Fill-In type question." })
    }
    else if (typeCd == 2) {
      this.newQuestionForm.patchValue({ typeDescription: "Choose the one answer that best suits the question." })
    }
    else {
      this.newQuestionForm.patchValue({ typeDescription: "Choose all answers that best suits the question." })
    }
  }

  displayAlertMsg(msg: string): void {
    this.showAlertMsg = true;
    this.alertMsg = msg;
  }

  closeAlert(): void {
    this.showAlertMsg = false;
    this.alertMsg = '';
  }
}
