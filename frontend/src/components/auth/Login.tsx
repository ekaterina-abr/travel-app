import { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
import { useGetVerifySession } from "../../hooks";
import { apiUrls } from "../../api";

const inputStyles: InputProps = { size: "lg" };

export const Login = () => {
  const navigate = useNavigate();
  const {
    loading: verifySessionLoading,
    data: verifySessionData,
    // error: verifySessionError,
  } = useGetVerifySession();

  useEffect(() => {
    if (verifySessionData?.isAuth) {
      navigate(apiUrls.profile);
    }
  }, [navigate, verifySessionData]);

  const { register, handleSubmit, formState } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: LoginFormSchemaType) => {
    console.log("submit data", JSON.stringify(data));
    // TODO: add request to backend
  };

  if (verifySessionLoading) {
    return (
      <Center h="80vh">
        <Spinner size="xl" />
      </Center>
    );
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
          {/* TODO: add {isPending ||} to disabled prop */}
          <Button type="submit" size="lg" disabled={!formState.isValid}>
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
