"use client";

import * as React from "react";
import Link from "next/link";
import { useCourses } from "@/hooks/querys/useCourses";
import { RenderPublicCourses } from "@/components/ui/renderPublicCourses";
import { AnimatedSection } from "@/components/landing/AnimatedSection";
import { useSession } from "next-auth/react";
import { roleString } from "@/lib/roleUtils";

export default function Page() {
  const { data: courses } = useCourses();
  const { data: session, status } = useSession();

  const user = session?.user;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col justify-center items-start py-16 px-6 md:px-12 lg:px-20 w-full bg-gradient-to-br from-slate-100 to-slate-200 min-h-[280px]">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold my-4 text-slate-900 tracking-tight">
            Learn today, succeed tomorrow!
          </h1>
          <p className="text-lg text-slate-700 tracking-wide leading-relaxed mb-6">
            Quality courses, brighter future.
          </p>
          {!user && status !== "loading" && (
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/auth/login"
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-dodger-blue-500 text-white font-medium hover:bg-dodger-blue-600 transition"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center px-5 py-2.5 rounded-xl border-2 border-dodger-blue-500 text-dodger-blue-600 font-medium hover:bg-dodger-blue-50 transition"
              >
                Sign up (Learner)
              </Link>
            </div>
          )}
          {user && (
            <Link
              href={`/${roleString(user?.role)?.toLowerCase()}/dashboard`}
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-dodger-blue-500 text-white font-medium hover:bg-dodger-blue-600 transition"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Default Collaborator Account */}
      <AnimatedSection
        direction="up"
        className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 w-full bg-amber-50/90 min-h-[200px] border-y border-amber-200"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Default Collaborator Account</h2>
        <p className="text-slate-600 mb-4 max-w-2xl">
          Use this account to log in as a Collaborator (create and manage courses).
        </p>
        <div className="inline-flex flex-col gap-1 p-4 bg-white rounded-xl border border-amber-200 font-mono text-sm">
          <span><strong>Email:</strong> collab@gmail.com</span>
          <span><strong>Password:</strong> collab</span>
        </div>
        <Link
          href="/auth/login"
          className="mt-4 inline-flex items-center text-dodger-blue-600 font-medium hover:underline"
        >
          Log in as Collaborator →
        </Link>
      </AnimatedSection>

      {/* Learner - Create Account */}
      <AnimatedSection
        direction="up"
        className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 w-full bg-white min-h-[200px]"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Learner</h2>
        <p className="text-slate-600 mb-4 max-w-2xl">
          Create your own account to enroll in courses, learn, and take quizzes.
        </p>
        <Link
          href="/auth/register"
          className="inline-flex items-center px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition w-fit"
        >
          Sign up as Learner
        </Link>
      </AnimatedSection>

      {/* New Courses */}
      <AnimatedSection
        direction="up"
        className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 w-full bg-slate-50 min-h-[400px]"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">What&apos;s new</h2>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto text-center">Discover the latest courses and start learning.</p>
        <div className="flex flex-wrap gap-6 justify-center items-stretch w-full">
          <RenderPublicCourses courses={courses} start={0} end={3} viewType="PREVIEW-COURSE" />
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/course"
            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-dodger-blue-500 text-white font-medium hover:bg-dodger-blue-600 transition"
          >
            View all courses
          </Link>
        </div>
      </AnimatedSection>

      {/* About */}
      <AnimatedSection
        direction="up"
        className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 w-full bg-white min-h-[240px] border-t border-slate-200"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-4">About OpenBK</h2>
        <p className="text-slate-700 max-w-2xl leading-relaxed">
          OpenBK is a learning and quiz platform. Collaborators create courses, add units and tests.
          Learners enroll in courses, study content, and take quizzes to reinforce their knowledge.
        </p>
      </AnimatedSection>
    </main>
  );
}
