import { GET_USER } from "@/graphql/queries/user";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { getToken, removeToken } from "./helpers";

interface userObjectJWT {
  email: string;
  exp: number;
  iat: number;
  id: string;
  name: string;
  username: string;
}

export const isAuth = () => {
  const token: any = getToken();
  const codeToken: userObjectJWT = jwtDecode(token);
  const { exp } = codeToken;

  if (Date.now() >= exp * 1000) {
    return removeToken();
  }
};

export const isUserNotFound = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { data, loading } = useQuery(GET_USER, {
    variables: {
      id: user?.id,
    },
  });

  if (loading) return;

  if (data?.getUser?.id === user?.id) {
    return;
  } else {
    removeToken();
    router.reload();
  }
};
