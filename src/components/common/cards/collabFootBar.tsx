import * as React from "react";
import { useParams } from "react-router-dom";
import { DeleteCourseBtn } from "../buttons/CourseBtn";

export const CollabFootBar: React.FC<{ courseID: string | null, price: string }> = ({ courseID, price }) => {

  return (
    <div className="flex gap-5 justify-between items-center pt-4 mt-1 w-full">
      <DeleteCourseBtn courseID={courseID as string} />
      <div className="self-stretch my-auto text-2xl font-bold text-sky-600">
        {price}$
      </div>
    </div>
  );
};
