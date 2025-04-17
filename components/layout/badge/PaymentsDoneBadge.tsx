export default function PaymentsDoneBadge({
  paymentsDone,
}: {
  paymentsDone: string;
}) {
  return (
    <span
      className={`${paymentsDone === "WAIT" && "bg-amber-400"} ${
        paymentsDone === "PAID" && "bg-teal-400"
      } 
    ${paymentsDone === "NONPAID" && "bg-pink-400"} p-1 rounded-md`}
    >
      {paymentsDone === "WAIT" && "결제대기"}
      {paymentsDone === "PAID" && "지불됨"}
      {paymentsDone === "NONPAID" && "지불안됨"}
    </span>
  );
}
