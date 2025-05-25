export class Course {
  courseID: string;
  courseName: string;
  description: string | null;
  imageUrl: string;
  category: string;
  price: string;
  authorInfo: {
    name: string;
    imageUrl: string;
  };
  createdAt: string;
  updatedAt: string;

  constructor(
    courseID: string,
    courseName: string,
    description: string | null,
    imageUrl: string,
    category: string,
    price: string,
    authorInfo: { name: string; imageUrl: string },
    createdAt: string,
    updatedAt: string,
  ) {
    this.courseID = courseID;
    this.courseName = courseName;
    this.description = description;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.authorInfo = authorInfo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export interface PublicCourseEntity extends Course {
  authorID: string;
}

export interface EnrolledCourseEntity extends Course {
  learnerID: string;
  enrollmentDate: string;
  status: string;
}

