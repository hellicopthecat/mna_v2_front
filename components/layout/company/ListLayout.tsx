import GoBackBtn from "../navigation/GoBackBtn";
interface IListLayoutProps {
  goBack: string;
  children: React.ReactNode;
}
export default function ListLayout({goBack, children}: IListLayoutProps) {
  return (
    <section className="flex flex-col gap-2 w-full">
      <GoBackBtn href={goBack} />
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
