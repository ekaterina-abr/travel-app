import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import { User } from "../../models/index.ts";
import {
  createSession,
  deleteSession,
  verifySession as _verifySession,
} from "../../session/index.ts";
import type { IApolloContext } from "../../types.ts";

export interface IRegisterArgs {
  input: {
    name: string;
    email: string;
    password: string;
  };
}

export interface ILoginArgs {
  input: {
    email: string;
    password: string;
  };
}

export const authResolver = {
  Query: {
    async verifySession(parent: any, args: null, context: IApolloContext) {
      return await _verifySession(context.session);
    },
    async getUserInfo(parent: any, args: null, context: IApolloContext) {
      const session = await _verifySession(context.session);
      console.log("getUserInfo session.userId", session.userId);

      if (session.userId) {
        const user = await User.findOne({ where: { id: session.userId } });

        if (!user) {
          throw new GraphQLError("Ошибка получения информации о пользователе");
        }

        const { id, name, email, role, created_at, saved_destinations } = user;
        return { id, name, email, role, created_at, saved_destinations };
      }
      return null;
    },
  },
  Mutation: {
    async register(parent: any, args: IRegisterArgs, context: IApolloContext) {
      const { name, email, password } = args.input;
      const alreadyExistUser = await User.findOne({ where: { email } });

      if (alreadyExistUser) {
        throw new GraphQLError(
          "Пользователь с данным email уже зарегистрирован"
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });

      if (!user) {
        throw new GraphQLError("Ошибка создания аккаунта");
      }

      const token = await createSession(user, context.setSession);
      return { id: user.id, name: user.name, email: user.email, token };
    },
    async login(parent: any, args: ILoginArgs, context: IApolloContext) {
      const { email, password } = args.input;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new GraphQLError("Пользователя с данным email не существует");
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword) {
        throw new GraphQLError("Неверный пароль");
      }

      const token = await createSession(user, context.setSession);
      return { id: user.id, name: user.name, email: user.email, token };
    },
    async logout(parent: any, args: null, context: IApolloContext) {
      deleteSession(context.setSession);
      return { isAuth: false, userId: null };
    },
  },
};
