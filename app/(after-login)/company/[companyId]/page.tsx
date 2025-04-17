import ToGoBtn from "@/components/layout/navigation/ToGoBtn";
import {REFRESHTOKEN} from "@/constants/constant";
import {ICompanyTypes} from "@/types/company/companyType";
import {IUserTypes} from "@/types/user/userType";
import {cookies} from "next/headers";

const getMyCompany = async (companyId: string) => {
  const cookie = await cookies();
  const company = await fetch(`http://localhost:4000/company/${companyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
    },
  });
  return await company.json();
};

const getMyId = async () => {
  const cookie = await cookies();
  const user = await fetch(`http://localhost:4000/auth/myprofile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
    },
  });
  return await user.json();
};

export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const data: ICompanyTypes = await getMyCompany(companyId);
  const user: IUserTypes = await getMyId();
  return (
    <section className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-end">
        <h2 className="font-bold text-3xl">{data.companyName}</h2>
        <p className="flex items-center gap-3">
          <span>{data.roadAddress}</span>
          <span>
            {data.restAddress}({data.zonecode})
          </span>
        </p>
      </div>

      <div>
        {/* 회계정보 */}
        <h2 className="font-bold text-2xl">회계정보</h2>
        {!data.companyAssets ? (
          <div className="flex flex-col">
            <span className="text-center">회계정보가 없습니다.</span>
            <ToGoBtn
              linkTxt={`/company/${companyId}/create-companyasset`}
              txt="회계생성하러가기"
            />
          </div>
        ) : (
          <div className="flex justify-between gap-3">
            <ToGoBtn
              linkTxt={`/company/${companyId}/${data.companyAssets?.id}`}
              txt="회계보러가기"
            />
            <ToGoBtn
              linkTxt={`/company/${companyId}/product`}
              txt={`회사상품보기 (${data.companyProduct.length})`}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {/* 인사정보 */}
        <h2 className="font-bold text-2xl">인사정보</h2>
        <ToGoBtn
          linkTxt={`/company/${companyId}/manager`}
          txt={`회계담당자보기 (${data.companyManager.length})`}
        />
        <ToGoBtn
          linkTxt={`/company/${companyId}/workers`}
          txt={`직원 (${data.companyWorker.length})`}
        />

        {data.companyManager.find((manager) => manager.id === user.id) && (
          <ToGoBtn
            linkTxt={`/company/${companyId}/workersVacations`}
            txt={`직원휴가보기`}
          />
        )}
        <ToGoBtn
          linkTxt={`/company/${companyId}/myVacation`}
          txt={`휴가보기`}
        />

        {data.companyManager.find((manager) => manager.id === user.id) && (
          <ToGoBtn
            linkTxt={`/company/${companyId}/workersSalary`}
            txt={`직원급여보기`}
          />
        )}
        <ToGoBtn linkTxt={`/company/${companyId}/mySalary`} txt={`급여보기`} />
      </div>

      <div className="flex flex-col gap-3">
        {/* 거래처정보 */}
        <h2 className="font-bold text-2xl">거래처정보</h2>
        <div className="flex gap-3">
          <ToGoBtn
            linkTxt={`/company/${companyId}/connected`}
            txt={`납품처(${data.connectedCompany.length})`}
          />
          <ToGoBtn
            linkTxt={`/company/${companyId}/connecting`}
            txt={`발주처(${data.connectingCompany.length})`}
          />
        </div>
      </div>
    </section>
  );
}
