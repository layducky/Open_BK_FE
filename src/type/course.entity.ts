export class Course {
  courseID: string;
  courseName: string;
  description: string | null;
  image: string;
  category: string;
  price: string;
  authorInfo: {
    name: string;
    image: string;
  };
  learnersCount?: number;
  createdAt: string;
  updatedAt: string;
  contentUpdatedAt?: string;

  constructor(
    courseID: string,
    courseName: string,
    description: string | null,
    image: string,
    category: string,
    price: string,
    authorInfo: { name: string; image: string },
    createdAt: string,
    updatedAt: string,
  ) {
    this.courseID = courseID;
    this.courseName = courseName;
    this.description = description;
    this.image = image;
    this.category = category;
    this.price = price;
    this.authorInfo = authorInfo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export interface PublicCourseEntity extends Course {
  authorID: string;
  authorStats?: {
    totalLearners: number;
    ownedCourses: number;
  };
}

export interface EnrolledCourseEntity extends Course {
  learnerID: string;
  enrollmentDate: string;
  status: string;
}

