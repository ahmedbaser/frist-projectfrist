
import { Schema, model } from 'mongoose';

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact No is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact No is required'],
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'ID is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',

    },
    
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloogGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuradianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },

    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});


// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};


export const Student = model<TStudent, StudentModel>('Student', studentSchema);























































































//------------------------------------------------------------------------
// import { Schema, model } from 'mongoose';
// // import validator from 'validator';
// import {
//   StudentModel,
//   TGuardian,
//   TLocalGuardian,
//   TStudent,
//   TStudentMethods,
//   TStudentModel,
//   TUserName,
// } from './student.interface';

// import bcrypt from 'bcrypt';
// import { config } from 'dotenv';

// const userNameSchema = new Schema<TUserName>({
//   firstName: {
//     type: String,
//     required: [true, 'First Name is required'],
//     trim: true,
//     maxlength: [20, 'Frist Name can be allow more than 20 letter'],
//     // validate: {
//     //   validator: function (value: string) {
//     //     const fristNameStr = value.charAt(0).toUpperCase() + value.slice(1); // Mezba
//     //     return fristNameStr === value;
//     //   },
//     //   message: '{VALUE} is not in capitalize',
//     // },
//   },
//   middleName: {
//     type: String,
//     trim: true,
//   },
//   lastName: {
//     type: String,
//     trim: true,
//     required: [true, 'Last Name is required'],
//     // validate: {
//     //   validator: (value: string) => validator.isAlpha(value),
//     //   message: '{VALUE} is not valid',
//     // },
//   },
// });

// const guardianSchema = new Schema<TGuardian>({
//   fatherName: {
//     type: String,
//     trim: true,
//     required: [true, 'Father Name is required'],
//   },
//   fatherOccupation: {
//     type: String,
//     trim: true,
//     required: [true, 'Father Occuption is required'],
//   },
//   fatherContactNo: {
//     type: String,
//     trim: true,
//     required: [true, 'Father ContactNo is required'],
//   },
//   motherName: {
//     type: String,
//     trim: true,
//     required: [true, 'Mother Name is required'],
//   },
//   motherOccupation: {
//     type: String,
//     trim: true,
//     required: [true, 'Motheroccuption is required'],
//   },
//   motherContactNo: {
//     type: String,
//     trim: true,
//     required: [true, 'Mother  contact no ir required'],
//   },
// });

// const localGuradiantSchema = new Schema<TLocalGuardian>({
//   name: {
//     type: String,

//     required: [true, 'name is required'],
//   },
//   occuption: {
//     type: String,

//     required: [true, 'occuption is required'],
//   },
//   contactNo: {
//     type: String,
//     required: [true, 'contactNo is  required'],
//   },
//   address: {
//     type: String,
//     required: [true, 'address is required'],
//   },
// });

// // eslint-disable-next-line no-undef
// const studentSchema = new Schema<TStudent, TStudentModel,TStudentMethods>({
//   id: { type: String, required: true, unique: true },
//   password: { type: String, required: [true, 'Password is required'], unique: true, maxlength:[20,'Password can not be more than 20 character'] },
//   name: {
//     type: userNameSchema,
//     required: [true, 'Name  is required'],
//   },
//   /* mongose has [enam] it use like  that  ["male","female"] it will take on condition if true--. it's use when I have predefine value*/
//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female', 'other'],
//       message: '{VALUE} is not valid',
//     },
//    required: [true, 'Gender  is required'],
//   },
//   dateOfBrith: { type: String },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     // validate: {
//     //   validator: (value: string) => validator.isEmail(value),
//     //   message: '{VALUE} is not a valid',
//     // },
//   },
//   contactNo: { type: String, required: true },
//   emergencyContactNo: {  type: String, required: true },
//   bloodGroup: {
//     type: String,
//     enum: {
//       values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//       message: '{VALUE} is not a valid blood group',
//     },
//   },
//   presentAddress: { type: String, required: true },
//   permanantAddress: { type: String, required: true },
//   guardian: {
//     type: guardianSchema,

//     required: [true, 'Guardian Name is required'],
//   },
//   localGuardian: {
//     type: localGuradiantSchema,
//     required: [true, 'Local guardian Name is required'],
//   },
//   profileImg: {
//     type: String,
//   },

//   isActive: {
//     type: String,

//     enum: ['active', 'blocked'],
//     default: 'active',
//   },
// });

// // pre save middleware / hook : will work on create() save()

// studentSchema.pre('save'. function() {
//  console.log(this, 'pre hook : we will save data')
// });

// // post save middleware / hook

// studentSchema.post('save', async function(next) {
//   // console.log(this, 'post hook : wesaved our data');

//   const user = this;
//   const user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))

//   next();

// });

// // creating a custom instance method

// studentSchema.static.isUserExists = async function (id:string) {
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

// // studentSchema.methods.isUserExists = async function(id: string){
// //    const existingUser = await Student.findOne({id});
// //    return existingUser;
// //   }

// export const Student = model<TStudent, StudentModel>('Student', studentSchema);
