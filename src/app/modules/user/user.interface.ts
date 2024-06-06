export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked'; // status are wo type 1. in hypen progress 2. blocked
  isDeleted: boolean;
};

 
