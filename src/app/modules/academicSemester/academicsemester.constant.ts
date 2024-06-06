import { TAcademicSemsterCode, TAcademicSemsterName, TAcademicSemsterNameCodeMapper, TMonths } from "./academicSemester.interface";

export const Months: TMonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
export const AcademicSemesterName: TAcademicSemsterName[] = ['Autumn', 'Summar', 'Fall']  
export const AcademicSemesterCode: TAcademicSemsterCode[] = ['01', '02', '03']

 
  
export const academicSemesterNameCodeMapper: TAcademicSemsterNameCodeMapper ={
  Autumn: '01',
  Summar: '02',
  Fall: '03', 

};
