import { setAuthInterceptor } from "@/config/axios.config";
import { Fragment, useEffect, useState, type PropsWithChildren } from "react";
import { useRamasQuery } from "@/queries/ramas.queries";
import { useUsersQuery } from "@/queries/user.queries";
import { useFamilyQueries } from "@/queries/family.queries";
import { usePersonsQueries } from "@/queries/persons.queries";
import { useCuotaQueries } from "@/queries/cuota.queries";
import { AppLoader } from "../common/AppLoader";
import { useCuotaPorHermanosQueries } from "@/queries/cuotaPorHermano.queries";

export function DataProvider({ children }: PropsWithChildren) {
  const accessToken = localStorage.getItem("accessToken");

  const [loading, setLoading] = useState(false);

  const { fetchFamilies } = useFamilyQueries();
  const { fetchPersons } = usePersonsQueries();
  const { fetchCuotas } = useCuotaQueries();
  const { fetchCPH } = useCuotaPorHermanosQueries();

  const ramaQuery = useRamasQuery();
  const usersQuery = useUsersQuery();
  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        await setAuthInterceptor(accessToken);
        await fetchFamilies();
        await fetchPersons();
        await fetchCuotas();
        await fetchCPH();
      } catch (error) {
        console.log("Error fetching initial data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || ramaQuery.isLoading || usersQuery.isLoading)
    return <AppLoader />;
  return <Fragment>{children}</Fragment>;
}
