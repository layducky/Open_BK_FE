'use client'

import * as React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCourseData } from '@/hooks/querys/useCourseData';
import { CourseInfoBar } from '@/components/ui/infoBar';
import { ReviewCourseCard } from '@/components/common/cards/reviewCourseCard';

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

        const tabs = courseID
            ? [
                { id: 'overview', label: 'Overview', href: `/course/${courseID}/overview` },
                { id: 'content', label: 'Content', href: `/course/${courseID}/content` },
                { id: 'about', label: 'About', href: `/course/${courseID}/about` },
              ]
            : [];
        const currentRoute = usePathname();
        return (
            <main className='min-h-screen grid grid-cols-1 md:grid-cols-10'>
                <div className='col-span-1 md:col-span-8 p-2'>
                    {courseData && <CourseInfoBar courseData={courseData}/>}
                    <div className="md:hidden">
                        <ReviewCourseCard courseID={courseID || ''} courseData={courseData ?? undefined} />
                    </div>

                    <div className="flex flex-col h-fit w-full">
                        <div className="flex flex-row w-full flex-wrap relative gap-3">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    className={`flex flex-row w-fit flex-wrap px-7 py-2 text-base cursor-pointer hover:bg-gray-500/10 rounded-t-md duration-300 ease-in-out transition-all transform relative ${
                                        currentRoute === tab.href ? 'font-semibold' : 'font-medium'
                                    }`}
                                >
                                    {tab.label}
                                    {currentRoute === tab.href && (
                                        <motion.div
                                            layoutId="courseTabActive"
                                            className="absolute bottom-0 left-0 bg-dodger-blue-500 h-[3px] w-full"
                                            transition={{ duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            ))}
                            <div className="w-full h-full border-b-[3px] border-[#C7C6CA] absolute left-0 top-0 -z-10" />
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="p-4 md:px-12 rounded-xl border border-solid border-black border-opacity-30 w-full text-left">
                            {children }
                        </div>
                    </div>
                </div>
                <aside className='hidden md:block col-span-1 md:col-span-2 p-2'>
                    <ReviewCourseCard courseID={courseID || ''} courseData={courseData ?? undefined} />
                </aside>
            </main>
        )
    }
