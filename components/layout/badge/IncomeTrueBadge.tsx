export default function IncomeTrueBadge({incomeTrue}: {incomeTrue: boolean}) {
  return (
    <span
      className={`${
        incomeTrue ? "bg-cyan-600" : "bg-fuchsia-600"
      } p-1 rounded-md `}
    >
      {incomeTrue ? "수입" : "지출"}
    </span>
  );
}
