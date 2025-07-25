import { setAuthInterceptor } from "@/config/axios.config";
import { useEffect, useState, type PropsWithChildren } from "react";
import { PageLoader } from "../common/PageLoader";
import { useRamasQueries } from "@/queries/ramas.queries";
import { useUserQueries } from "@/queries/user.queries";

export function DataProvider({ children }: PropsWithChildren) {
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);
  const { fetchRamas } = useRamasQueries();
  const { fetchUsers } = useUserQueries();
  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        await setAuthInterceptor(accessToken);
        await fetchRamas();
        await fetchUsers();
      } catch (error) {
        console.log("Error fetching initial data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <PageLoader />;
  return <div>{children}</div>;
}
