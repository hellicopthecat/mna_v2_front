import DeleteCompanyForm from "@/components/company/deleteCompany/DeleteCompanyForm";
import GoBackBtn from "@/components/layout/navigation/GoBackBtn";

export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;

  return (
    <div className="flex flex-col gap-5">
      <GoBackBtn href={`/company/${companyId}`} />
      <DeleteCompanyForm companyId={companyId} />
    </div>
  );
}
