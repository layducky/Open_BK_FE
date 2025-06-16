'use client';
import * as React from "react";
import Slogan from "@/components/layout/slogan";
import { useCourses } from "@/hooks/querys/useCourses";
import { RenderPublicCourses } from "@/components/ui/renderPublicCourses";


export default function Page() {
  const { data: courses } = useCourses();

  return (
    <main>
      <Slogan />

      <section className="flex flex-col justify-center px-20 w-full bg-white min-h-[595px] max-md:px-5 max-md:max-w-full">
        <h2 className="text-3xl leading-none text-black">What's new</h2>
        <div className="flex flex-wrap gap-6 justify-center items-center py-4 w-full max-md:max-w-full">
          <RenderPublicCourses courses={courses} start={0} end={3} viewType="PREVIEW-COURSE" />
        </div>
      </section>

    </main>
  );
}

