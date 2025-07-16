import { useEffect } from "react";
import "./App.css";
import {
  fakeUsers,
  fakePersons,
  fakeCuotas,
  fakePayments,
  fakeFamilies,
  fakeRamas,
  fakeBalances,
} from "./mock/fakeData";
function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("FAKE DATA:", {
          USERS: fakeUsers,
          PERSONS: fakePersons,
          CUOTAS: fakeCuotas,
          PAYMENTS: fakePayments,
          FAMILIES: fakeFamilies,
          RAMAS: fakeRamas,
          BALANCES: fakeBalances,
        });
      } catch (error) {
        console.log("Error parsing user data:", error);
      }
    };
    fetchData();
  }, []);

  return <>Hello World</>;
}

export default App;
