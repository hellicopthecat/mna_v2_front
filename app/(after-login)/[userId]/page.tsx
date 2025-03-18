export default async function Page({
  params,
}: {
  params: Promise<{userId: string}>;
}) {
  const {userId} = await params;
  return <div className="text-red-500">{userId}</div>;
}
