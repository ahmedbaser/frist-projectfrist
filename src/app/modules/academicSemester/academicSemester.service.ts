
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TAcademicSemster, } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { academicSemesterNameCodeMapper } from "./academicsemester.constant";

const createAcademicSemesterIntoDB = async(payLoad: TAcademicSemster) => {
    //semester name --> semseter
  if(academicSemesterNameCodeMapper[payLoad.name]!== payLoad.code) {
    throw new  Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payLoad);
  return result;
}  


const getAllAcademicSemestersfromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
}

const getSingleAcademicSemesterFromDB = async (id:string) => {
  const result = await AcademicSemester.findById(id);
  return result;
}

const updateAcademicSemesterIntoD = async (id: string, payLoad: Partial<TAcademicSemster>,) => {
 if(payLoad.name && payLoad.code && academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
  throw new AppError(httpStatus.NOT_FOUND,'Invalid Semester Code');
 }
 const result = await AcademicSemester.findOneAndUpdate({_id: id}, payLoad, {
  new: true,
 });
 return result;
}









export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersfromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoD,
}