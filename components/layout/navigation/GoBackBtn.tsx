import Link from "next/link";

export default function GoBackBtn({href}: {href: string}) {
  return (
    <Link href={href}>
      <svg
        fill="none"
        strokeWidth={4}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
    </Link>
  );
}
