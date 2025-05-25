import { redirect } from "next/navigation";
type PageProps = Promise<{
    courseID: string;
  }>;
//*Handle automatic redirect to overview
export default async function Page(props: {params: PageProps}) {
    const { courseID } = await props.params;
    redirect(`/course/${courseID}/overview`);
}
