"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BulletItem } from "@/components/ui/bulletItem";
import { TestLink } from "@/components/common/TestLink";
import { useUser } from "@/hooks/querys/useUser";
import { useUnits, usePublicUnits } from "@/hooks/querys/useCourses";
import { useEnrolledCourses } from "@/hooks/querys/useEnrollCourse";
import { useCourseData } from "@/hooks/querys/useCourseData";
import { UnitActionDropdown, TestActionDropdown, DocumentActionDropdown, VideoActionDropdown } from "@/components/common/buttons/UnitBtn";
import { VideoPlayerModal } from "@/components/common/VideoPlayer";
import { CreateUnitBtn } from "@/components/common/buttons/UnitBtn";
import { formatDateTime } from "@/lib/dateUtils";

export default function CourseContentPage({ params }: { params: Promise<{ courseID: string }> }) {
  const [courseID, setCourseID] = React.useState<string | null>(null);
  const [newUnitID, setNewUnitID] = React.useState<string | null>(null);
  const [videoPlayerOpen, setVideoPlayerOpen] = React.useState<{ videoID: string; videoName: string } | null>(null);

  React.useEffect(() => {
    const fetchCourseID = async () => {
      const { courseID } = await params;
      setCourseID(courseID);
    };

    fetchCourseID();
  }, [params]);

  const { data: userInfo } = useUser();
  const { data: enrolledCourses, isError: enrollError, isLoading: enrollLoading } = useEnrolledCourses();
  const { data: courseData } = useCourseData(courseID as string);

  const enrolled = Array.isArray(enrolledCourses) && enrolledCourses.some((c: { courseID: string }) => String(c.courseID) === String(courseID));
  const isCollabOrAdmin = (userInfo?.role === "COLLAB" && courseData?.authorID === userInfo?.id) || userInfo?.role === "ADMIN";
  const isEnrolled = !enrollError && !enrollLoading && (enrolled || isCollabOrAdmin);

  const unitsWithAuth = useUnits(courseID as string, { enabled: !!isEnrolled && !!courseID });
  const unitsPublic = usePublicUnits(courseID as string, { enabled: !isEnrolled && !!courseID });
  const { data: unitContents, isLoading, error, refetch } = isEnrolled ? unitsWithAuth : unitsPublic;

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
  if (error) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-amber-800 font-medium">
          Error loading content: {(error as Error).message}
        </p>
        {courseID && (
          <a
            href={`/course/${courseID}/overview`}
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            Go to course overview
          </a>
        )}
      </div>
    );
  }

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
              <AccordionContent className="overflow-y-auto max-h-[60vh]">
                <div className="flex flex-col min-h-[10rem]">
                  <div className={`flex flex-col md:flex-row w-full pb-4`}>
                    <div className="w-full md:hidden flex justify-center">
                    { unit.unitID && userInfo?.role === "COLLAB"
                    && <UnitActionDropdown courseID={courseID || ""} unitID={unit.unitID} refetchUnits={refetch} /> }
                    </div>                    
                    <div className="w-full md:w-1/2">
                    {[
                    { iconType: "download", bulletType:"borderText", text: `Created at: ${formatDateTime(unit.createdAt)}` },
                    { iconType: "infinity", bulletType:"borderText", text: `Updated at: ${formatDateTime(unit.contentUpdatedAt ?? unit.updatedAt)}` },
                    ].map((item, itemIndex) => (
                      <BulletItem key={itemIndex} {...item}/>
                    ))}
                    </div>
                    <div className="hidden md:flex md:w-1/2 justify-end">
                    { unit.unitID && userInfo?.role === "COLLAB"
                    && (
                        <UnitActionDropdown courseID={courseID || ""} unitID={unit.unitID} refetchUnits={refetch}/> 
                    )}
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-end">            
                    <BulletItem bulletType="borderText" iconType="certificate" text={unit.description || ""} />
                    {Array.isArray(unit.unit_tests) &&
                      unit.unit_tests.map(({ testName, testID }, testIndex: number) => (
                        <div key={testIndex} className="flex items-center gap-2 w-full border-t-2 border-dotted border-solid border-gray-300 py-4">
                          <div className="flex-1 min-w-0">
                            <TestLink
                              testID={testID}
                              testName={testName || ""}
                              courseID={courseID || ""}
                              isEnrolled={!!isEnrolled}
                              noBorder
                            />
                          </div>
                          {(userInfo?.role === "COLLAB" || userInfo?.role === "ADMIN") && (
                            <div className="flex-shrink-0">
                              <TestActionDropdown
                                testID={testID}
                                unitID={unit.unitID}
                                refetchUnits={refetch}
                                deleteOnly
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    {Array.isArray(unit.unit_documents) &&
                      unit.unit_documents.map(({ documentID, documentName }, docIndex: number) => (
                        <div key={docIndex} className="flex items-center gap-2 w-full border-t-2 border-dotted border-solid border-gray-300 py-4">
                          <div className="flex-1 min-w-0">
                            <a
                              href={`${process.env.NEXT_PUBLIC_API_URL || ""}/course/public/document/${documentID}/download`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline font-medium"
                            >
                              📄 {documentName}
                            </a>
                          </div>
                          {(userInfo?.role === "COLLAB" || userInfo?.role === "ADMIN") && (
                            <div className="flex-shrink-0">
                              <DocumentActionDropdown
                                documentID={documentID}
                                unitID={unit.unitID}
                                courseID={courseID || undefined}
                                refetchUnits={refetch}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    {Array.isArray(unit.unit_videos) &&
                      unit.unit_videos.map(({ videoID, videoName }, vidIndex: number) => (
                        <div key={vidIndex} className="flex items-center gap-2 w-full border-t-2 border-dotted border-solid border-gray-300 py-4">
                          <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => setVideoPlayerOpen({ videoID, videoName })}
                              className="text-blue-600 hover:underline font-medium"
                            >
                              ▶️ {videoName} (Xem)
                            </button>
                            <span className="text-gray-400">|</span>
                            <a
                              href={`${process.env.NEXT_PUBLIC_API_URL || ""}/course/public/video/${videoID}/download`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline font-medium"
                            >
                              ⬇️ Tải về
                            </a>
                          </div>
                          {(userInfo?.role === "COLLAB" || userInfo?.role === "ADMIN") && (
                            <div className="flex-shrink-0">
                              <VideoActionDropdown
                                videoID={videoID}
                                unitID={unit.unitID}
                                courseID={courseID || undefined}
                                refetchUnits={refetch}
                              />
                            </div>
                          )}
                        </div>
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
      {videoPlayerOpen && (
        <VideoPlayerModal
          videoID={videoPlayerOpen.videoID}
          videoName={videoPlayerOpen.videoName}
          isOpen={!!videoPlayerOpen}
          onClose={() => setVideoPlayerOpen(null)}
        />
      )}
    </div>
  );
}
