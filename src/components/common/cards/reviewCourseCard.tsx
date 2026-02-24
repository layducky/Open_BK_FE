'use client'
import { BulletItem } from '@/components/ui/bulletItem';
import { ButtonClick } from '@/components/common/buttons/button';
import { useEnrolledCourses } from '@/hooks/querys/useEnrollCourse';
import { PublicCourseEntity } from '@/type/course.entity';

const courseFeatures = [
    { iconType: "video", text: '95 hours on-demand video' },
    { iconType: "article", text: '35 articles' },
    { iconType: "test", text: '2 practice tests' },
    { iconType: "test", text: 'Assignments' },
    { iconType: "download", text: '100 downloadble resources' },
    { iconType: "infinity", text: 'Full lifetime access' },
    { iconType: "certificate", text: 'Certificate of completion' }
]

export const ReviewCourseCard = ({
    courseID,
    courseData,
}: {
    courseID: string | null;
    courseData?: PublicCourseEntity | null;
}) => {
    const { data: enrolledList } = useEnrolledCourses();
    const isEnrolled = !!enrolledList?.find((c: { courseID: string }) => c.courseID === courseID);

    return (
        <div className="top-10 flex-col mx-auto sticky">
            <div className='shadow-lg bg-white rounded-lg border py-4'>
                <div className="flex flex-col px-2.5 py-4 w-full text-base">
                    <h2 className="font-bold">This course includes:</h2>
                    <div className="flex flex-col items-start mt-2.5 w-full">
                        {courseFeatures.map((item, index) => (
                            <BulletItem key={index} {...item}/>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col pt-2.5 w-full text-sm font-semibold px-2.5">
                    {!isEnrolled ? (
                        <>
                            <div className="flex justify-center items-center w-full pb-2">
                                <span className="text-xl font-bold text-green-600">
                                    {courseData?.price != null && courseData?.price !== '' ? `${courseData.price}$` : 'Free'}
                                </span>
                            </div>
                            <div className="flex justify-center items-center w-full pb-6">
                                <ButtonClick
                                    courseID={courseID}
                                    className="w-[200px]"
                                >
                                    Enroll now
                                </ButtonClick>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center w-full pb-6">
                            <div className="flex justify-center items-center w-[200px] p-1.5 bg-gray-300 text-gray-600 font-semibold text-md rounded-3xl border-2 border-gray-400 cursor-not-allowed pointer-events-none">
                                Enrolled
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
