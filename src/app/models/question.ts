export interface QuestionModel {
    id: string;
    examId: string;
    addedBy: string;
    content: string;
    typeDescription: string;
    typeCode: number;
    options: string[];
}