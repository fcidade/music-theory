export class Lesson { }

export enum Language {
    Portuguese = 'pt-br'
}


export const getLesson = (language: Language, lessonID: string): Lesson => {
    return new Lesson()
}