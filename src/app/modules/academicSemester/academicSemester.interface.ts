export type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TAcademicSemsterName = 'Autumn' | 'Summar' | 'Fall';
export type TAcademicSemsterCode = '01' | '02' | '03';


export type TAcademicSemster = {
    name: TAcademicSemsterName, 
    code: TAcademicSemsterCode,
    year: string,
    startMonth: TMonths,
    endMonth: TMonths,
}

export type TAcademicSemsterNameCodeMapper = {
  [key: string] : string;

};