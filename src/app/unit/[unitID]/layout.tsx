'use client'
import * as React from 'react'
import { useCourseData } from '@/hooks/useCourseData';

export default function CourseLayout({
        children,
        params
    }: Readonly<{
        children: React.ReactNode;
        params: Promise<{ courseID: string }>
    }>) {
        const [courseID, setCourseID] = React.useState<string | null>(null);

        React.useEffect(() => {
            // Giải nén giá trị từ params (là một Promise)
            const fetchCourseID = async () => {
                const resolvedParams = await params;
                setCourseID(resolvedParams.courseID);
            };

            fetchCourseID();
        }, [params]);

        const {data: courseData} = useCourseData(courseID as string);
    
        
        // const courseFeatures = [
        //     { type: "video", text: '95 hours on-demand video' },
        //     { type: "article", text: '35 articles' },
        //     { type: "test", text: '2 practice tests' },
        //     { type: "test", text: 'Assignments' },
        //     { type: "download", text: '100 downloadble resources' },
        //     { type: "infinity", text: 'Full lifetime access' },
        //     { type: "certificate", text: 'Certificate of completion' }
        //   ]

        // //*Pathname
        // const tabs = [
        //     { label: 'Overview', href: `/course/${courseID}/overview` },
        //     { label: 'Content', href: `/course/${courseID}/content` },
        //     { label: 'About', href: `/course/${courseID}/about` },
        //     { label: 'Reviews', href: `/course/${courseID}/review` }
        // ];
        // const currentRoute: string = usePathname();
        return (
            <main> 
                {children}
            </main>
        )
    }
