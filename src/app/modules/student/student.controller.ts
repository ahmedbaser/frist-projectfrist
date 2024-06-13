import {  RequestHandler, } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';







const getSingleStudent  = catchAsync(async (req,  res) => {

    const { id } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(id);
      sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result
     }) 
});


const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
 
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result
   }) 

});

const updateStudent = catchAsync(async(req, res)=> {
  const {id} = req.params;
  const {student} = req.body;
   const result = await StudentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  })
})





const deleteStudent = catchAsync(async (req, res) => {

  const { id } = req.params;

  const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result
   }) 

}); 




export const StudentControllers = {
  getSingleStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};

//--------------------------------------------------------------------------------------------
// import { Request, Response } from 'express';
// import { StudentServices } from './student.service';
// // import Joi from 'joi';
// import { z } from 'zod';
// // import studentValidationSchema from './student.joi.validation';
// import studentValidationSchema from './student.validation';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;
//     // data validation usign Joi
//     // const { error} = studentValidationSchema.validate(studentData);

//     //data validation usign Zod
//     const zodparseData = studentValidationSchema.parse(studentData);

//     const result = await StudentServices.createStudentIntoDB(zodparseData);

//     res.status(200).json({
//       success: true,
//       message: 'Student is created successfully',
//       data: result,
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'something went to wrong',
//       error: err,
//     });
//   }
// };

// const getAllStudents = async (req: Request, res: Response) => {
//   try {
//     const result = await StudentServices.getAllStudentsFromDB();
//     res.status(200).json({
//       success: true,
//       message: 'Student is retrieved successfully',
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       error: err,
//     });
//   }
// };

// const getSingalStudent = async (req: Request, res: Response) => {
//   try {
//     const { studentId } = req.params;
//     const result = await StudentServices.getSingalStudentFromDB(studentId);
//     res.status(200).json({
//       success: true,
//       message: 'Student is retrieved succesfully',
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       error: err,
//     });
//   }
// };

// export const StudentControllers = {
//   createStudent,
//   getAllStudents,
//   getSingalStudent,
// };

// /*
// // will call service function to send this data
//   const result = await StudentServices.createStudentintoDB(student);

//  */
