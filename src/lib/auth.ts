import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

export const authOptions: NextAuthOptions = {
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(prisma as any),
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password!))) {
          return null;
        }

        return {
          id: user.id,
          email: user.id,
          name: user.username,
          randomKey: "Hey cool",
        };
      },
      type: "credentials",
      id: "signin"
    }),
    CredentialsProvider({
      name: "signup",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        console.log(user)

        if(user){
          NextResponse.json({erro:true},{
            status: 401,
          })
          return  null;
        } else {


          const createUser = await prisma.user.create({
            data: {
              username: credentials.username,
              password:  bcrypt.hashSync(credentials.password,12),
            },
          })


          if(createUser){
            return  {
              id: createUser.id,
              username: createUser.username,
              erro: false,
              msg: "Usuário cadastrado com sucesso!",
            };
          } else{
          return  {
              id: "",
              erro: true,
              msg: "Erro ao cadastrar usuário!",
            };
          }

        }
        // if (!user || !(await bcrypt.compare(credentials.password, user.password!))) {
        //   return null;
        // }

        // return {
        //   id: user.id,
        //   email: user.id,
        //   name: user.username,
        //   randomKey: "Hey cool",
        // };
      },
      type: "credentials",
      id: "signup"
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug:true
};
