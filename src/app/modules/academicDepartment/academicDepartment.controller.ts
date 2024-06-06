import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async(req, res) => {
    const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department is created successfully',
        data: result,
    });

});

const getAllAcademicDepartment = catchAsync(async(req, res) => {
    const result = await AcademicDepartmentService.getAllAcademicDepartmentFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic departments retrieved successfully',
        data: result,
    });
});

const getSingleAcademicDepartment = catchAsync(async(req, res) => {
    const {departmentId} = req.params;
    const result = await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(departmentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message:  'Academic department retrieved successful',
        data: result,
    });
});


const updateAcademicDepartment = catchAsync(async(req, res)=> {
    const {departmentId} = req.params;
    const result = await AcademicDepartmentService.updateAcademicDepartmentIntoDB(departmentId, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department is update successfully',  
      data: result,
    })
})


export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
}



