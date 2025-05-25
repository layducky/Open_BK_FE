import { redirect } from "next/navigation";
type PageProps = Promise<{
    unitID: string;
  }>;
//*Handle automatic redirect to overview
export default async function Page(props: {params: PageProps}) {
    const { unitID } = await props.params;
    redirect(`/unit/${unitID}/review`);
}
