import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async(payLoad: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payLoad);
    return result;
};


const getAllAcademicFacultyIntoDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
}

const getSingalAcademicFacultyIntoDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
}

const updateAcedamicFacultyIntoDB = async (id: string, payLoad: Partial<TAcademicFaculty>,) =>  {
    const result = await AcademicFaculty.findOneAndUpdate({_id: id}, payLoad, {
        new: true,
    });
    return result;
}

export const AcademicFacultyService = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyIntoDB,
    getSingalAcademicFacultyIntoDB,
    updateAcedamicFacultyIntoDB,
}