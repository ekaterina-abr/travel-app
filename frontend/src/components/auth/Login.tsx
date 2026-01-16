import { useCallback, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Center,
  Field,
  Flex,
  Heading,
  Input,
  InputProps,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { LoginFormSchema, LoginFormSchemaType } from "../../zod-schemes";
import { routes } from "../../config";
import {
  useGetVerifySession,
  useMutateLogin,
  useMutateSaveDestinations,
} from "../../hooks";
import { graphqlClient } from "../../api";
import { GlobalStore } from "../../stores";
import { redirectOnAuth } from "../../utils";

interface ILogin {
  globalStore: GlobalStore;
}

const inputStyles: InputProps = { size: "lg" };

export const Login = ({ globalStore }: ILogin) => {
  const {
    loading: verifySessionLoading,
    data: verifySessionData,
    // error: verifySessionError,
    refetch: verifySessionRefetch,
  } = useGetVerifySession();

  const [
    login,
    {
      data: loginResultData,
      loading: loginLoading,
      // error: loginError,
    },
  ] = useMutateLogin();

  const [saveDestinations] = useMutateSaveDestinations();

  useEffect(() => {
    if (loginResultData && loginResultData?.login?.token) {
      graphqlClient.resetStore();
      verifySessionRefetch();
    }
  }, [loginResultData]);

  const { register, handleSubmit, formState } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onTouched",
  });

  const redirectToProfile = useCallback(
    async () =>
      await redirectOnAuth({
        globalStore,
        saveDestinations,
        verifySessionData,
      }),
    [globalStore, saveDestinations, verifySessionData]
  );

  const onSubmit = (data: LoginFormSchemaType) => {
    login({ variables: { input: data } });
  };

  if (verifySessionLoading) {
    return (
      <Center h="80vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (verifySessionData?.verifySession?.isAuth) {
    redirectToProfile();
  }

  return (
    <Flex py={5} px={4} justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          direction="column"
          gap={3}
          p={3}
          maxW={["none", "none", "800px"]}
          minW={["98vw", "98vw", "50vw"]}
        >
          <Heading size={["2xl", "4xl"]} alignSelf="center">
            Вход
          </Heading>
          <Field.Root invalid={!!formState.errors?.email?.message}>
            <Field.Label>Электронная почта</Field.Label>
            <Input
              type="email"
              defaultValue={formState.defaultValues?.email}
              placeholder="somebody@mail.ru"
              {...inputStyles}
              {...register("email")}
            />
            <Field.ErrorText>
              {formState.errors?.email?.message}
            </Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!formState.errors?.password?.message}>
            <Field.Label>Пароль</Field.Label>
            <Input
              type="password"
              defaultValue={formState.defaultValues?.password}
              {...inputStyles}
              {...register("password")}
            />
            <Field.ErrorText>
              {formState.errors?.password?.message}
            </Field.ErrorText>
          </Field.Root>
          <Button
            type="submit"
            size="lg"
            disabled={loginLoading || !formState.isValid}
          >
            Войти
          </Button>
          <Flex justifyContent="center">
            <Text mr={1}>Нет аккаунта?</Text>

            <Link asChild color="darkBlue">
              <RouterLink to={routes.signup}>Зарегистрироваться</RouterLink>
            </Link>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};
