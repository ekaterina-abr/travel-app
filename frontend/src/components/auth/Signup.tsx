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
import { SignupFormSchema, SignupFormSchemaType } from "../../zod-schemes";
import { routes } from "../../config";
import { useGetVerifySession, useMutateRegister } from "../../hooks";
import { apiUrls } from "../../api";

const inputStyles: InputProps = { size: "lg" };

export const Signup = () => {
  const navigate = useNavigate();
  const {
    loading: verifySessionLoading,
    data: verifySessionData,
    // error: verifySessionError,
  } = useGetVerifySession();

  const [
    mutateRegister,
    {
      data: registerResultData,
      loading: registerLoading,
      // error: registerError,
    },
  ] = useMutateRegister();

  useEffect(() => {
    if (verifySessionData?.isAuth) {
      navigate(apiUrls.profile);
    }
  }, [navigate, verifySessionData]);

  useEffect(() => {
    if (registerResultData && registerResultData?.token) {
      navigate(apiUrls.profile);
    }
  }, [navigate, registerResultData]);

  const { register, handleSubmit, formState } = useForm<SignupFormSchemaType>({
    resolver: zodResolver(SignupFormSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: SignupFormSchemaType) => {
    mutateRegister({ variables: { input: data } });
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
            Регистрация
          </Heading>
          <Field.Root invalid={!!formState.errors?.name?.message}>
            <Field.Label>Имя</Field.Label>
            <Input
              type="text"
              defaultValue={formState.defaultValues?.name}
              placeholder="Иван Иванов"
              {...inputStyles}
              {...register("name")}
            />
            <Field.ErrorText>{formState.errors?.name?.message}</Field.ErrorText>
          </Field.Root>
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
            disabled={registerLoading || !formState.isValid}
          >
            Зарегистрироваться
          </Button>
          <Flex justifyContent="center">
            <Text mr={1}>Уже зарегистрированы?</Text>

            <Link asChild color="darkBlue">
              <RouterLink to={routes.login}>Войти</RouterLink>
            </Link>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};
