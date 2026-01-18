import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { SignOut } from "@phosphor-icons/react";
import { useMutateLogout } from "../../hooks";
import { graphqlClient } from "../../api";

export const Logout = () => {
  const navigate = useNavigate();
  const [
    logout,
    {
      data: logoutData,
      loading: logoutLoading,
      // error: logoutError
    },
  ] = useMutateLogout();

  useEffect(() => {
    if (logoutData?.logout?.isAuth === false) {
      graphqlClient.resetStore();
      navigate("/");
    }
  }, [navigate, logoutData]);

  const onClick = () => logout();

  return (
    <Button
      variant="ghost"
      size="md"
      px={2}
      onClick={onClick}
      disabled={logoutLoading}
    >
      <SignOut weight="fill" />
    </Button>
  );
};
