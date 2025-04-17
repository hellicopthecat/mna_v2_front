import Link from "next/link";

export default function MyPageNav({userId}: {userId: string}) {
  return (
    <nav className="self-end">
      <ul>
        <li>
          <Link
            href={`/${userId}/create-company`}
            className="bg-blue-500 p-2 rounded-md"
          >
            회사생성하기
          </Link>
        </li>
      </ul>
    </nav>
  );
}
