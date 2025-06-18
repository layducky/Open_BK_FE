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
  const [newUnitID, setNewUnitID] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCourseID = async () => {
      const { courseID } = await params;
      setCourseID(courseID);
    };

    fetchCourseID();
  }, [params]);

  const { data: unitContents, isLoading, error, refetch } = useUnits(courseID as string);
  const { data: userInfo } = useUser();

  React.useEffect(() => {
    const fetchNewUnitID = async () => {
      if (Array.isArray(unitContents) && unitContents.length > 0) {
        setNewUnitID(newUnitID);
        setTimeout(() => {
          setNewUnitID(null);
        }, 1000);
      }
    };

    fetchNewUnitID();
  }, [newUnitID, unitContents]);

  if (isLoading) return <div>Loading units...</div>;
  if (error) return <div>Error loading units: {error.message}</div>;

  return (
    <div>
      <div className="flex">
        <div className="w-5/6">
          <h2 className="mt-2.5 leading-none text-2xl font-bold pt-2">Course content</h2>
        </div>
        {userInfo?.role === "COLLAB" &&
          <div className="w-1/6">
            <CreateUnitBtn courseID={courseID as string} setNewUnitID={setNewUnitID} refetchUnits={refetch}/>
          </div>
        }
      </div>
      <Accordion type="single" collapsible>
        <AnimatePresence>
          {unitContents && unitContents.map((unit) => (
            <motion.div
              key={unit.unitID}
              initial={unit.unitID === newUnitID ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
            <AccordionItem value={`unit-${unit.unitID}`}>
              <AccordionTrigger className="text-xl">{unit.numericalOrder}. {unit.unitName}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col min-h-[10rem]">
                  <div className={`flex flex-col md:flex-row w-full pb-4`}>
                    <div className="w-full md:hidden flex justify-center">
                    { unit.unitID && userInfo?.role === "COLLAB"
                    && <ActionDropdown courseID={courseID || ""} unitID={unit.unitID} refetchUnits={refetch} /> }
                    </div>                    
                    <div className="w-full md:w-1/2">
                    {[
                    { iconType: "download", bulletType:"borderText", text: `Created at: ${unit.createdAt}` },
                    { iconType: "infinity", bulletType:"borderText", text: `Updated at: ${unit.updatedAt}` },
                    ].map((item, itemIndex) => (
                      <BulletItem key={itemIndex} {...item}/>
                    ))}
                    </div>
                    <div className="hidden md:flex md:w-1/2 justify-end">
                    { unit.unitID && userInfo?.role === "COLLAB"
                    && <ActionDropdown courseID={courseID || ""} unitID={unit.unitID} refetchUnits={refetch}/> }
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-end">            
                    <BulletItem bulletType="borderText" iconType="certificate" text={unit.description || ""} />
                    {Array.isArray(unit.unit_tests) && unit.unit_tests.map(({ testName, testID }, testIndex: number) => (
                      <BulletItem key={testIndex} bulletType="link" iconType="test" text={testName || ""} ID={testID}/>
                    ))}
                  <div>

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
