import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations,} from "./course.validation";
import { courseControllers } from "./course.controller";

const router = express.Router();

router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema),courseControllers.createCourse);

router.get('/:id', courseControllers.getSingalCourse);


router.patch(
    '/:id',
    validateRequest(CourseValidations.updateCourseValidationSchema),
    courseControllers.updateCourse,
  );
  
router.delete('/:id', courseControllers.deleteCourse);

router.put(
    '/:courseId/assign-faculties',
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    courseControllers.assignFacultiesWithCourse,
  );
  
  router.delete(
    '/:courseId/remove-faculties',
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    courseControllers.removeFacultiesFromCourse,
  );
  

router.get('/', courseControllers.getAllCourses);



export const courseRoutes = router;

