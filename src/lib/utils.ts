import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PublicCourseEntity } from "@/domain/course.entity";
import { EnrolledCourseEntity } from "@/domain/course.entity";
import { Course } from "@/domain/course.entity";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const transformToCourse = ({ courseID, courseName, description, imageUrl, category, price, authorInfo , createdAt, updatedAt }: PublicCourseEntity | EnrolledCourseEntity) => {
  console.log(typeof authorInfo);
  return new Course( courseID, courseName, description, imageUrl, category, price, authorInfo, createdAt, updatedAt);
} 
  
