import { redirect } from "next/navigation";

//*Handle automatic redirect to overview
export default async function Page({params}: {params: {courseID: string}}) {
    redirect(`/course/${params.courseID}/overview`);
}
