interface IAfterLoginLayout {
  children: React.ReactNode;
  modal: React.ReactNode;
}
export default function AfterLoginLayout({children, modal}: IAfterLoginLayout) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
