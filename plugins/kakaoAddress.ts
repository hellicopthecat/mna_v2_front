import {Dispatch, SetStateAction} from "react";

interface IKakaoAddressProps {
  sido: string;
  sigungu: string;
  /** 법정동/법정리 */
  bname: string;
  /** 법정리 읍/면 */
  bname1: string;
  /** 법정동/법정리 */
  bname2: string;
  jibunAddress: string;
  roadAddress: string;
  roadname: string;
  zonecode: string;
}

export const intitKakaoAddress = () => {
  const script = document.createElement("script");
  script.id = "kakaoAddress";
  script.type = "text/javascript";
  script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  document.body.appendChild(script);
};

export const unMountKakaoAddress = () => {
  const script = document.getElementById("kakaoAddress");
  if (script) {
    document.body.removeChild(script);
  }
};

export const onClickAddressBtn = (
  setState: Dispatch<SetStateAction<IKakaoAddressProps>>
) => {
  // @ts-expect-error Note -> 외부API
  new daum.Postcode({
    oncomplete: function (data: IKakaoAddressProps) {
      setState(() => ({
        sido: data.sido,
        sigungu: data.sigungu,
        bname: data.bname,
        bname1: data.bname1,
        bname2: data.bname2,
        jibunAddress: data.jibunAddress,
        roadAddress: data.roadAddress,
        roadname: data.roadname,
        zonecode: data.zonecode,
      }));
    },
  }).open();
};
