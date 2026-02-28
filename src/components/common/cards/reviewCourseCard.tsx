'use client'
import { BulletItem } from '@/components/ui/bulletItem';
import { ButtonClick } from '@/components/common/buttons/button';
import { useEnrolledCourses } from '@/hooks/querys/useEnrollCourse';
import { usePublicUnits } from '@/hooks/querys/useCourses';
import { useUser } from '@/hooks/querys/useUser';
import { PublicCourseEntity } from '@/type/course.entity';
import { formatPrice } from '@/lib/formatPrice';

export const ReviewCourseCard = ({
    courseID,
    courseData,
}: {
    courseID: string | null;
    courseData?: PublicCourseEntity | null;
}) => {
    const { data: userInfo } = useUser();
    const { data: enrolledList, isError, isLoading } = useEnrolledCourses();
    const { data: units } = usePublicUnits(courseID || '', { enabled: !!courseID });

    const enrolled = Array.isArray(enrolledList) && enrolledList.some((c: { courseID: string }) => String(c.courseID) === String(courseID));
    const isCollabOrAdmin = (userInfo?.role === "COLLAB" && courseData?.authorID === userInfo?.id) || userInfo?.role === "ADMIN";
    const isEnrolled = !isError && !isLoading && (enrolled || isCollabOrAdmin);

    const testCount = units?.reduce((acc, u) => acc + (u.unit_tests?.length || 0), 0) ?? 0;
    const courseFeatures = [
        { iconType: "test", text: `${testCount} practice test${testCount !== 1 ? 's' : ''}` },
        { iconType: "infinity", text: 'Full lifetime access' },
        { iconType: "certificate", text: 'Certificate of completion' },
        { iconType: "video", text: '0 hours on-demand video' },
        { iconType: "article", text: '0 articles' },
    ];

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
                                    {formatPrice(courseData?.price)}
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
