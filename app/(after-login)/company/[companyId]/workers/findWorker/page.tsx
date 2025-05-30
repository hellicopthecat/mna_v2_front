import FindWorkerModal from "@/components/company/workers/findWorker/FindWorkerModal";
import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const token = (await cookies()).get(ACCESSTOKEN)?.value + "";
  return <FindWorkerModal companyId={companyId} token={token} />;
}
