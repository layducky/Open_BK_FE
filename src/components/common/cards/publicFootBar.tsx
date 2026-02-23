import { ButtonClick } from "../buttons/button";
import * as React from "react";
import ArrowRight from "/public/svg/arrow_right.svg";
import { useParams } from "react-router-dom";
export const PublicFootBar: React.FC<{ price: string }> = ({ price }) => {
  const [courseID, setCourseID] = React.useState<string | null>(null);
  const params = useParams<{ courseID: string }>();

  React.useEffect(() => {
    const fetchCourseID = async () => {
      if (params.courseID) {
        setCourseID(params.courseID);
      }
    };

    fetchCourseID();
  }, [params.courseID]);

  return (
    <div className="flex gap-5 justify-between items-center pt-4 mt-1 w-full">
      <ButtonClick courseID={courseID}>
        Enroll now
        <ArrowRight />
      </ButtonClick>
      <div className="self-stretch my-auto text-xl font-bold text-green-600">
        {price}$
      </div>
    </div>
  );
};
