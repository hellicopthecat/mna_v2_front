import CreateProduct from "@/components/company/product/CreateProduct";

export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  return <CreateProduct companyId={companyId} />;
}
