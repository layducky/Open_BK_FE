import { redirect } from "next/navigation";

//*Handle automatic redirect to overview
export default async function Page({params}: {params: {unitID: string}}) {
    redirect(`/unit/${params.unitID}/review`);
}
