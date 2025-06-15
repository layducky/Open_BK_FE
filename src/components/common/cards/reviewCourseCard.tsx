'use client'
import { BulletItem } from '@/components/ui/bulletItem';
import { ButtonClick } from '@/components/common/buttons/button';
import { PublicCourseEntity } from "@/type/course.entity";
import { CourseInfoBar } from '@/components/ui/infoBar';

const courseFeatures = [
    { type: "video", text: '95 hours on-demand video' },
    { type: "article", text: '35 articles' },
    { type: "test", text: '2 practice tests' },
    { type: "test", text: 'Assignments' },
    { type: "download", text: '100 downloadble resources' },
    { type: "infinity", text: 'Full lifetime access' },
    { type: "certificate", text: 'Certificate of completion' }
    ]

export const ReviewCourseCard = ({courseID}: {courseID: string | null}) => {
    return(
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
                <div className="flex flex-col pt-2.5 w-full text-sm font-semibold">
                    <div className="flex justify-center items-center px-2.5 w-full">
                        <div className="flex pb-6 items-start self-stretch my-auto w-[223px]">
                            <ButtonClick 
                                courseID={courseID} 
                                className="w-[200px]">Enroll now</ButtonClick>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}