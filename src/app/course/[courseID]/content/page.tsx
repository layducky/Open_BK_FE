'use client';
import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BulletItem } from "@/components/ui/bulletItem";
import { useUnits } from "@/hooks/useCourses";
import { ViewTestButton } from "@/components/common/buttons/UnitBtn";
import { useUser } from "@/hooks/useUser";
import { CreateUnitBtn, DeleteUnitBtn } from "@/components/common/buttons/UnitBtn";

export default function CourseContentPage({ params }: { params: Promise<{ courseID: string }> }) {
  const [courseId, setCourseId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCourseId = async () => {
      const { courseID } = await params;
      setCourseId(courseID);
    };

    fetchCourseId();
  }, [params]);

  const { data: courseContent } = useUnits(courseId as string);
  const { data: userInfo } = useUser();

  return (
    <div>
      <div className="flex">
        <div className="w-5/6">
          <h2 className="mt-2.5 leading-none text-2xl font-bold">Course content</h2>
        </div>
        {userInfo?.role === "COLLAB" &&
          <div className="w-1/6">
            <CreateUnitBtn courseID={courseId as string}/>
          </div>
        }
      </div>
      <Accordion type="single" collapsible>
        {courseContent?.map((unit, index) => (
          <AccordionItem key={index} value={`unit-${unit.unitID}`}>
            <AccordionTrigger className="text-xl">{unit.numericalOrder}. {unit.unitName}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:hidden flex justify-end">
                  { unit.unitID 
                  && <ViewTestButton unitID={unit.unitID} /> }
                  {unit.unitID && userInfo?.role === "COLLAB" 
                  && <DeleteUnitBtn unitID={unit.unitID} /> }
                </div>
                <div className="w-full md:w-4/6">

                  {[
                    { type: "certificate", text: unit.description || "" },
                    { type: "test", text: `Number of questions: ${unit.numberOfQuestions ?? 0}` },
                    { type: "download", text: `Created at: ${unit.createdAt}` },
                    { type: "infinity", text: `Updated at: ${unit.updatedAt}` },
                  ].map((item, itemIndex) => (
                    <BulletItem key={itemIndex} {...item} />
                  ))}
                </div>
                <div className="hidden sm:block md:w-2/6">
                  { unit.unitID 
                    && <ViewTestButton unitID={unit.unitID} />}
                  {unit.unitID && userInfo?.role === "COLLAB" 
                    && <DeleteUnitBtn unitID={unit.unitID} />}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
