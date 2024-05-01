import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { JWT } from 'next-auth/jwt'
import { HasuraAdapter } from 'next-auth-hasura-adapter'
import * as jsonwebtoken from 'jsonwebtoken'
import { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // todo: implement with credentials later; need to create an endpoint for registering
    // Credentials({
    //   name: 'Credentials',
    //   credentials: {
    //     username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   authorize(credentials) {
    //     return {
    //       id: 'd205d746-08e9-450b-9840-0840a8f4dd61',
    //       name: 'test',
    //       email: 'test@test.com',
    //     }
    //   },
    // }),
  ],
  adapter: HasuraAdapter({
    endpoint: process.env.HASURA_PROJECT_ENDPOINT!,
    adminSecret: process.env.HASURA_ADMIN_SECRET!,
  }),
  theme: {
    colorScheme: 'auto',
  },
  // Use JWT strategy so we can forward them to Hasura
  session: { strategy: 'jwt' },
  // Encode and decode your JWT with the HS256 algorithm
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(token!, secret, {
        algorithm: 'HS256',
      })
      return encodedToken
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret, {
        algorithms: ['HS256'],
      })
      return decodedToken as JWT
    },
  },
  callbacks: {
    // Add the required Hasura claims
    // https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#the-spec
    async jwt({ token }) {
      return {
        ...token,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user'],
          'x-hasura-default-role': 'user',
          'x-hasura-role': 'user',
          'x-hasura-user-id': token.sub,
        },
      }
    },
    // Add user ID to the session
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!
      }
      return session
    },
  },
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
