import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async(id: string, payLoad: Partial<TStudent>) => {
  const {name, guardian,  localGuardian, ...remaningStudentData} = payLoad;

  const   modifiedUpdateData : Record<string, unknown> = {...remaningStudentData}

  /* 
  guradian: {
    fatherOccuption: 'Tacher"
  }
  guradian.fatherOccuption: Tacher
  
  name:firstName = "Mezaba"
  name:lastName = "Abedin"
  */


  if(name && Object.keys(name).length) {
    for(const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`$name${key}`] = value;  
    }
  }

  if(guardian && Object.keys(guardian).length) {
    for(const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`$guardian${key}`] = value;
    }
  }

  if(localGuardian && Object.keys(localGuardian).length) {
    for(const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`$guardian${key}`] = value;
    }
  }



console.log(modifiedUpdateData)



  const result = await Student.findOneAndUpdate({id}, modifiedUpdateData, {new:true, runValidators})
  return result;
}





const deleteStudentFromDB = async (id: string) => {

const session = await mongoose.startSession();

try{
   session.startTransaction();  

 

  const deletedStudent = await Student.findOneAndUpdate({id}, {isDeleted: true},  {new: true, session});
   if(!deletedStudent) {
    throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete student')
   }
   const deleteUser = await User.findOneAndUpdate({id},{isDeleted: true},{new: true, session},);
   if(!deleteUser) {
    throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete student')
   }
   await session.commitTransaction();
   await session.endSession();
   return deletedStudent;

} catch(err) {
    await session.abortTransaction();
    await session.endSession();
    throw new  Error('Failed to delete student')
}
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};

//---------------------------------------------------------------------
// import { Student } from './student.model';
// import { TStudent } from './student.interface';
// import { error } from 'console';
 
// const createStudentIntoDB = async (studentData: TStudent) => {
//   if(await Student.isUserExist(studentData.id)) {
//   throw new Error('User already exists');
//   }
//   const result = await Student.create(studentData); // bulit in static method

//   // const student  = new Student(studentData); // create an instance

//   // if(await student.isUserExists(studentData.id)){
//   //  throw new Error('user already exist')
//   // }

//   // const result = await student.save() // buit in instance method
//   return result;
// };

// const getAllStudentsFromDB = async () => {
//   const result = await Student.find();
//   return result;
// };

// const getSingalStudentFromDB = async (id: string) => {
//   const result = await Student.findOne({ id });
//   return result;
// };


// export const StudentServices = {
//   createStudentIntoDB,
//   getAllStudentsFromDB,
//   getSingalStudentFromDB,
// };
