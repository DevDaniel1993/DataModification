import { useEffect, useState } from "react";
import userServices, { UserData } from "../services/userServices";
import { CanceledError } from "../services/APIClient";

const useUsers = () => {
  const [users, setUser] = useState<UserData[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const { request, cancel } = userServices.getAll<UserData>();
    request
      .then((respond) => {
        setUser(respond.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setLoading(false);

        return () => cancel();
      });
  }, []);
  return { users, error, isLoading, setError, setUser };
};

export default useUsers;
