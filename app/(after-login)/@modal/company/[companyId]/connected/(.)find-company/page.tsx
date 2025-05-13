import FindCompany from "@/components/company/connectCompany/FindCompany";

export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  return <FindCompany companyId={companyId} />;
}
