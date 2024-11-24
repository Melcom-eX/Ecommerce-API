import {
  User as PrismaUser,
  Role,
  Enrollment,
  EnrollmentStatus,
  Grade,
  Course,
} from "@prisma/client";
interface UserDocument extends PrismaUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phoneNumber: string;
  enrollmentDate: Date;
  major: string;
  isVerified: boolean;
  role: Role;
  enrollments: Enrollment[];
}

interface UserUpdateInput {
  fullName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  enrollmentDate?: Date;
  otp?: string | null;
  otpExpiration?: Date | null;
  major?: string;
  isVerified?: boolean;
  role?: Role;
  enrollments?: {
    create?: Enrollment[];
    connect?: { id: string }[];
    disconnect?: { id: string }[];
  };
}
interface EnrollmentDocument extends Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
  status: EnrollmentStatus;
  grades?: Grade[];
  student: {
    id: string;
    fullName: string;
    email: string;
    major: string;
  };
  course: {
    id: string;
    courseName: string;
    courseDescription: string;
    department: string;
    credits: number;
  };
}
interface EnrollmentUpdateInput {
  status: EnrollmentStatus;
}

interface courseDocument extends Course {
  id: string;
  courseName: string;
  courseDescription: string;
  credits: number;
  department: string;
  enrollments: Enrollment[];
}
interface courseUpdateInput {
  id?: string;
  courseName?: string;
  courseDescription?: string;
  credits?: number;
  department?: string;
}
interface gradeDocument extends Grade {
  id: string;
  enrollment: Enrollment[];
  enrollmentId: string;
  grade: string;
  gradeDate: Date;
}
export {
  UserDocument,
  UserUpdateInput,
  EnrollmentDocument,
  EnrollmentUpdateInput,
  courseDocument,
  courseUpdateInput,
  gradeDocument,
};
