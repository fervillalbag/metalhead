import { useCallback, useContext, useEffect } from "react";

// import { GET_USER } from "@/graphql/queries/user";
// import { useQuery } from "@apollo/client";
import { UserContext } from "@/context/UserContext";
import { decodeToken, getToken, setToken } from "../utils/helpers";

const useAuth = () => {
  const { user, setUser } = useContext(UserContext);

  // const { data } = useQuery(GET_USER, {
  //   variables: {
  //     id: user?.id,
  //   },
  // });

  // if (data === undefined) return null;
  // useEffect(() => {
  // }, [data]);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setUser(null);
    } else {
      setUser(decodeToken(token));
    }
  }, []);

  const login = useCallback(
    (token) => {
      setToken(token);
      setUser(decodeToken(token));
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setToken("");
    setUser(null);
  }, [setUser]);

  return {
    user,
    isLogged: Boolean(user),
    login,
    logout,
  };
};

export default useAuth;
