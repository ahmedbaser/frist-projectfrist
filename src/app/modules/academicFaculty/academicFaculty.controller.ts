import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFaculty } from "./academicFaculty.model";
import { AcademicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async(req, res) => {
    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(req.body)
  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty is created successfully',
        data: result,
    })
});

const getAllAcademicFaculties = catchAsync(async(req, res)=> {
    const result = await AcademicFacultyService.getAllAcademicFacultyIntoDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty are retrived successfully',
        data: result,
    });
});

const getSingalAcademicFaculty = catchAsync(async(req, res)=> {
    const {facultyId} = req.params;
    const result = await AcademicFacultyService.getSingalAcademicFacultyIntoDB(facultyId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty is retrived successfuly',
        data: result,
    });
});

const updateAcedamicFaculty = catchAsync(async(req, res) => {
    const {facultyId} = req.params;
    const result = await AcademicFacultyService.updateAcedamicFacultyIntoDB(
        facultyId,
        req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingalAcademicFaculty,
    updateAcedamicFaculty,

}