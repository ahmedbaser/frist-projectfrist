import { Schema, model} from  'mongoose'
import { TAcademicSemster } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicsemester.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';




const acdemicSemesterSchema = new Schema<TAcademicSemster>(
 {
   name: {
    type: String,
    required: true,
    enum:AcademicSemesterName,
   },
   year: {
    type: String,
    required: true,
   },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCode,
   }, 
  startMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  
},
{
  timestamps: true,
});


acdemicSemesterSchema.pre('save', async function(next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  
  });
  if(isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND,'Semester is already exists !')
  }
  next();
});






export const  AcademicSemester = model<TAcademicSemster>(
  'AcademicSemester',
  acdemicSemesterSchema,
);



// Name Year
// 2030 Autum => Created
// 2031 Autum
//2030 Autum => xxx
// 2030 Fall => Created

// Autumn 01
// Summar 02
// Fall 03


