'use client'

import * as React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCourseData } from '@/hooks/useCourseData';
import { CourseInfoBar } from '@/components/ui/infoBar';
import { ReviewCourseCard } from '@/components/common/cards/reviewCourseCard';

const Tab: React.FC<{
    label: string,
    isActive: boolean,
    ref: string
}> = ({ label, isActive = false, ref }) => (
    isActive ? (
    <span
        tabIndex={0}
        className={`self-stretch px-2.5 py-1.5 my-auto whitespace-nowrap rounded-[50px] bg-amber-300 font-bold`}
    >
        {label}
    </span>
    ) : (
    <Link
        tabIndex={0}
        href = {ref}
        className={`self-stretch px-2.5 py-1.5 my-auto whitespace-nowrap rounded-[50px] bg-zinc-200 hover:bg-zinc-300`}
    >
        {label}
    </Link>    
    )
);


export default function CourseLayout({
        children,
        params
    }: Readonly<{
        children: React.ReactNode;
        params: Promise<{ courseID: string }>
    }>) {
        const [courseID, setCourseID] = React.useState<string | null>(null);

        React.useEffect(() => {
            const fetchCourseID = async () => {
                const resolvedParams = await params;
                setCourseID(resolvedParams.courseID);
            };

            fetchCourseID();
        }, [params]);

        const {data: courseData} = useCourseData(courseID as string);

        //*Pathname
        const tabs = [
            { label: 'Overview', href: `/course/${courseID}/overview` },
            { label: 'Content', href: `/course/${courseID}/content` },
            { label: 'About', href: `/course/${courseID}/about` },
            // { label: 'Reviews', href: `/course/${courseID}/overview` }
        ];
        const currentRoute: string = usePathname();
        return (
            <main className='min-h-screen grid grid-cols-1 md:grid-cols-10'>
                <div className='col-span-1 md:col-span-8 p-2'>
                    {courseData && <CourseInfoBar courseData={courseData}/>}
                    <div className="md:hidden">
                        <ReviewCourseCard courseID={courseID || ''} />
                    </div>

                    <div
                        className="flex flex-wrap gap-4 items-center px-24 py-4 max-w-full text-base text-center text-black max-md:px-5 ">
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.label}
                                ref={tab.href}
                                isActive= {currentRoute === tab.href}
                            />

                        ))}
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="p-4 md:px-12 rounded-xl border border-solid border-black border-opacity-30 w-full">
                            {children }
                        </div>
                    </div>
                </div>
                <aside className='hidden md:block col-span-1 md:col-span-2 p-2'>
                    <ReviewCourseCard courseID={courseID || ''} />
                </aside>
            </main>
        )
    }
