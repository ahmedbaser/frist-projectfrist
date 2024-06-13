import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {CourseServices } from "./course.service";

const createCourse = catchAsync(async(req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body)
  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is created successfully',
        data: result,
    })
});

const getAllCourses = catchAsync(async(req, res)=> {
    const result = await CourseServices.getAllCoursesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course  are retrived successfully',
        data: result,
    });
});

const getSingalCourse = catchAsync(async(req, res)=> {
    const {id} = req.params;
    const result = await  CourseServices.getSingleCourseFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is retrived successfuly',
        data: result,
    });
});

const updateCourse = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await CourseServices.updateCourseIntoDB(
       id, req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async(req, res)=> {
    const {id} = req.params;
    const result = await  CourseServices.deleteCourseFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted successfuly',
        data: result,
    });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
  
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
      courseId,
      faculties,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties assigned  succesfully',
      data: result,
    });
  });

  const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
  
    const result = await CourseServices.removeFacultiesFromCourseFromDB(
      courseId,
      faculties,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties removed  succesfully',
      data: result,
    });
  });
  


export const courseControllers = {
    createCourse,
    getSingalCourse,
    getAllCourses,
    deleteCourse,
    updateCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse,
}