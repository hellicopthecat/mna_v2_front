import ListLayout from "@/components/layout/company/ListLayout";
import {REFRESHTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";

const getWorkersVacation = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-workers/${companyId}/vacations`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
      },
    }
  );
  const data = await response.json();
  return data;
};
export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const data = await getWorkersVacation(companyId);
  console.log(data);
  return (
    <ListLayout goBack={`/company/${companyId}`}>
      <button></button>
      <div></div>
    </ListLayout>
  );
}
