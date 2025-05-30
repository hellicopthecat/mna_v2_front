import ProductCard from "@/components/company/product/ProductCard";
import ListLayout from "@/components/layout/company/ListLayout";
import ToGoBtn from "@/components/layout/navigation/ToGoBtn";
import {ACCESSTOKEN} from "@/constants/constant";
import {IProductTypes} from "@/types/product/productType";
import {IResponseErrorType} from "@/types/response/responseType";
import {cookies} from "next/headers";

const getCompanyProducts = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/product/totalProduct/${companyId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    return data as IResponseErrorType;
  }
  return data as IProductTypes[];
};
export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const data = await getCompanyProducts(companyId);
  return (
    <ListLayout goBack={`/company/${companyId}`}>
      <ToGoBtn
        linkTxt={`/company/${companyId}/product/create-product`}
        txt="상품생성"
      />
      <ul className="flex flex-col gap-2">
        <ProductCard data={data} />
      </ul>
    </ListLayout>
  );
}
