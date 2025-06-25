import { redirect } from "next/navigation";
type PageProps = Promise<{
    testID: string;
  }>;
//*Handle automatic redirect to overview
export default async function Page(props: {params: PageProps}) {
    const { testID } = await props.params;
    redirect(`/test/${testID}`);
}
