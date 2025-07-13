import { useMemo } from "react";
import useMainContext from "../useMainContext";

const useExpensesByCategory = () => {
  const { transactions } = useMainContext();

  const expensesByCategory = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce<Record<string, number>>((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.value;
        return acc;
      }, {});
  }, [transactions]);

  return expensesByCategory;
};

export default useExpensesByCategory;
