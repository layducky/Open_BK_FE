"use client";

import * as React from "react";
import Link from "next/link";
import { useCourses } from "@/hooks/querys/useCourses";
import { RenderPublicCourses } from "@/components/ui/renderPublicCourses";
import { AnimatedSection } from "@/components/landing/AnimatedSection";

export default function Page() {
  const { data: courses } = useCourses();

  return (
    <main className="min-h-screen">
      {/* Hero / Slogan - no scroll animation, first thing visible */}
      <section className="flex flex-col justify-center items-start py-16 px-6 md:px-12 lg:px-20 w-full bg-gradient-to-br from-slate-100 to-slate-200 min-h-[280px]">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold my-4 text-slate-900 tracking-tight">
            Learn today, succeed tomorrow!
          </h1>
          <p className="text-lg text-slate-700 tracking-wide leading-relaxed">
            Quality courses, brighter future.
          </p>
        </div>
      </section>

      <AnimatedSection
        direction="up"
        className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 w-full bg-white min-h-[400px]"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-2">What&apos;s new</h2>
        <p className="text-slate-600 mb-8 max-w-xl">Discover the latest courses and start learning.</p>
        <div className="flex flex-wrap gap-6 justify-center md:justify-start items-stretch w-full">
          <RenderPublicCourses courses={courses} start={0} end={3} viewType="PREVIEW-COURSE" />
        </div>
        <div className="mt-8">
          <Link
            href="/course"
            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-dodger-blue-500 text-white font-medium hover:bg-dodger-blue-600 transition"
          >
            View all courses
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection
        direction="left"
        className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 w-full bg-slate-100 min-h-[320px]"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">About OpenBK</h2>
        <div className="max-w-2xl space-y-4 text-slate-700 text-lg leading-relaxed">
          <p>
            OpenBK is a <strong>test creation and learning platform</strong> where users can enroll in
            courses to access learning materials and take quizzes.
          </p>
          <p>
            Whether you want to study a new subject, practice with quizzes, or create and manage your
            own courses as an instructor, OpenBK provides the tools and content to support your goals.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection
        direction="right"
        className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 w-full bg-white min-h-[340px] border-t border-slate-200"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">For Learners</h2>
        <p className="text-slate-600 mb-6 max-w-2xl">
          Get started as a learner to browse courses and take quizzes.
        </p>
        <ul className="space-y-3 max-w-2xl text-slate-700 list-disc list-inside">
          <li>
            <strong>Log in</strong> with the <strong>Learner</strong> role (or sign up and choose Learner).
          </li>
          <li>
            Go to <strong>Courses</strong> to browse available courses and read descriptions.
          </li>
          <li>
            <strong>Enroll</strong> in a course by clicking &quot;Enroll now&quot; on the course page.
          </li>
          <li>
            Access course content and units, and take tests to check your progress.
          </li>
        </ul>
        <Link
          href="/course"
          className="mt-6 inline-flex items-center text-dodger-blue-600 font-medium hover:underline"
        >
          Browse courses →
        </Link>
      </AnimatedSection>

      <AnimatedSection
        direction="up"
        className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 w-full bg-amber-50/80 min-h-[300px]"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Taking tests</h2>
        <div className="max-w-2xl space-y-3 text-slate-700 text-lg leading-relaxed">
          <p>
            After enrolling in a course, you can access <strong>units</strong> and their <strong>tests</strong>.
          </p>
          <p>
            Each test has a time limit and multiple questions. Complete tests to reinforce what you
            learned and track your progress. Your results are saved so you can review your performance
            and retake tests when needed.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection
        direction="scale"
        className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 w-full bg-dodger-blue-50/70 min-h-[360px]"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">For Collaborators</h2>
        <p className="text-slate-600 mb-6 max-w-2xl">
          Collaborators are instructors who create and manage their own courses on OpenBK.
        </p>
        <ul className="space-y-3 max-w-2xl text-slate-700 list-disc list-inside">
          <li>
            <strong>Log in</strong> with the <strong>Collaborator</strong> role to access your dashboard.
          </li>
          <li>
            <strong>Create courses</strong>, add units, and attach tests to units so learners can practice.
          </li>
          <li>
            <strong>Manage your courses</strong>: edit content, add or remove units, and see how many
            learners have enrolled.
          </li>
          <li>
            Use the collaborator dashboard to view your created courses and learner enrollment at a glance.
          </li>
        </ul>
        <Link
          href="/collaborator/dashboard"
          className="mt-6 inline-flex items-center text-dodger-blue-600 font-medium hover:underline"
        >
          Collaborator dashboard →
        </Link>
      </AnimatedSection>
    </main>
  );
}
