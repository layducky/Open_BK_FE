'use client';
import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BulletItem } from "@/components/ui/bulletItem";
import { useUnits } from "@/hooks/useCourses";
import ActionDropdown, { ViewTestButton } from "@/components/common/buttons/UnitBtn";
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
        {courseContent && courseContent.map((unit, index) => (
          <AccordionItem key={index} value={`unit-${unit.unitID}`}>
            <AccordionTrigger className="text-xl">{unit.numericalOrder}. {unit.unitName}</AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col min-h-[10rem]">
                  <div className="flex flex-col md:flex-row w-full border-b-2 border-dotted border-solid border-gray-300 pb-4">
                    <div className="w-full md:hidden flex justify-center">
                      { unit.unitID && userInfo?.role === "COLLAB"
                      && <ActionDropdown unitID={unit.unitID} /> }
                    </div>                    
                    <div className="w-full md:w-1/2">
                      {[
                      { type: "download", text: `Created at: ${unit.createdAt}` },
                      { type: "infinity", text: `Updated at: ${unit.updatedAt}` },
                      ].map((item, itemIndex) => (
                      <BulletItem key={itemIndex} {...item} />
                      ))}
                    </div>
                    <div className="hidden md:flex md:w-1/2 justify-end">
                      { unit.unitID && userInfo?.role === "COLLAB"
                      && <ActionDropdown unitID={unit.unitID} /> }
                    </div>
                  </div>

                  <div>
                    <div className="w-full md:w-1/2 py-4">
                      {[
                      { type: "certificate", text: unit.description || "" },
                      { type: "test", text: `Number of questions: ${unit.numQuests ?? 0}` },
                      ].map((item, itemIndex) => (
                      <BulletItem key={itemIndex} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
