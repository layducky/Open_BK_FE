import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PublicCourseEntity } from "@/type/course.entity";
import { EnrolledCourseEntity } from "@/type/course.entity";
import { Course } from "@/type/course.entity";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const transformToCourse = ({ courseID, courseName, description, image, category, price, authorInfo , createdAt, updatedAt }: PublicCourseEntity | EnrolledCourseEntity) => {
  console.log(typeof authorInfo);
  return new Course( courseID, courseName, description, image, category, price, authorInfo, createdAt, updatedAt);
} 
  
