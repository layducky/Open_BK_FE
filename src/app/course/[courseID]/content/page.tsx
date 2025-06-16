'use client';
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BulletItem } from "@/components/ui/bulletItem";
import { useUser } from "@/hooks/querys/useUser";
import { useUnits } from "@/hooks/querys/useCourses";
import ActionDropdown from "@/components/common/buttons/UnitBtn";
import { CreateUnitBtn } from "@/components/common/buttons/UnitBtn";



export default function CourseContentPage({ params }: { params: Promise<{ courseID: string }> }) {
  const [courseID, setCourseID] = React.useState<string | null>(null);
  const [newUnitIDs, setNewUnitIDs] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchCourseID = async () => {
      const { courseID } = await params;
      setCourseID(courseID);
    };

    fetchCourseID();
  }, [params]);

  const { data: unitContents, isLoading, error, refetch } = useUnits(courseID as string);
  const { data: userInfo } = useUser();
  if (isLoading) return <div>Loading units...</div>;
  if (error) return <div>Error loading units: {error.message}</div>;


  return (
    <div>
      <div className="flex">
        <div className="w-5/6">
          <h2 className="mt-2.5 leading-none text-2xl font-bold">Course content</h2>
        </div>
        {userInfo?.role === "COLLAB" &&
          <div className="w-1/6">
            <CreateUnitBtn courseID={courseID as string} refetchUnits={refetch} />
          </div>
        }
      </div>
      <Accordion type="single" collapsible>
        <AnimatePresence>
          {unitContents && unitContents.map((unit) => (
            <motion.div
              key={unit.unitID}
              initial={newUnitIDs.includes(unit.unitID) ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
            <AccordionItem value={`unit-${unit.unitID}`}>
              <AccordionTrigger className="text-xl">{unit.numericalOrder}. {unit.unitName}</AccordionTrigger>
              <AccordionContent>
                  <div className="flex flex-col min-h-[10rem]">
                    <div className="flex flex-col md:flex-row w-full border-b-2 border-dotted border-solid border-gray-300 pb-4">
                      <div className="w-full md:hidden flex justify-center">
                        { unit.unitID && userInfo?.role === "COLLAB"
                        && <ActionDropdown courseID={courseID || ""} unitID={unit.unitID} refetchUnits={refetch} /> }
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
                        && <ActionDropdown courseID={courseID || ""} unitID={unit.unitID} refetchUnits={refetch}/> }
                      </div>
                    </div>

                    <div>
                      <div className="w-full md:w-1/2 py-4">
                        {[
                        { type: "certificate", text: unit.description || "" },
                        ].map((item, itemIndex) => (
                        <BulletItem key={itemIndex} {...item} />
                        ))}
                      </div>
                    </div>
                  </div>
              </AccordionContent>
            </AccordionItem>
          
            </motion.div>
          ))}
        </AnimatePresence>
      </Accordion>
    </div>
  );
}
