import { setAuthInterceptor } from "@/config/axios.config";
import { Fragment, useEffect, useState, type PropsWithChildren } from "react";
import { PageLoader } from "../common/PageLoader";
import { useRamasQueries } from "@/queries/ramas.queries";
import { useUserQueries } from "@/queries/user.queries";
import { useFamilyQueries } from "@/queries/family.queries";
import { usePersonsQueries } from "@/queries/persons.queries";
import { useCuotaQueries } from "@/queries/cuota.queries";

export function DataProvider({ children }: PropsWithChildren) {
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);
  const { fetchRamas } = useRamasQueries();
  const { fetchUsers } = useUserQueries();
  const { fetchFamilies } = useFamilyQueries();
  const { fetchPersons } = usePersonsQueries();
  const { fetchCuotas } = useCuotaQueries();
  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        await setAuthInterceptor(accessToken);
        await fetchRamas();
        await fetchUsers();
        await fetchFamilies();
        await fetchPersons();
        await fetchCuotas();
      } catch (error) {
        console.log("Error fetching initial data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <PageLoader />;
  return <Fragment>{children}</Fragment>;
}
