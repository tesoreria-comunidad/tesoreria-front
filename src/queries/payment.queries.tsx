import { paymetnAdapter } from "@/adapters";
import { PaymentServices } from "@/services/payment.service";
import { setPayments } from "@/store/features/payments/paymentsSlice";
import { useAppDispatch } from "@/store/hooks";
export function usePaymentQueries() {
  const dispatch = useAppDispatch();
  const fetchPayments = async () => {
    try {
      const apiPaymentsResponse = await PaymentServices.getAll();
      const adaptedPayments = apiPaymentsResponse.map((apiPayment) =>
        paymetnAdapter(apiPayment)
      );
      dispatch(setPayments(adaptedPayments));
    } catch (error) {
      console.log("Error fetching paymetns", error);
      throw error;
    }
  };

  return { fetchPayments };
}
