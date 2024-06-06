
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync( async (req, res) => {

  const { password, student: studentData } = req.body;
  
  
  

  
  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Student is created successfully',
  data: result,
 }) 

});

export const UserControllers = {
    createStudent
 }




























// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;
//     const zodParsedData = studentValidationSchema.parse(studentData);

//     const result = await StudentServices.createStudentIntoDB(zodParsedData);

//     res.status(200).json({
//       success: true,
//       message: 'Student is created succesfully',
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
