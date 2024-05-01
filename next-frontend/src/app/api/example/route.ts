// This is an example of to protect an API route
import { getToken } from 'next-auth/jwt'
import { request, gql } from 'graphql-request'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({
      error:
        'You must be signed in to view the protected content on this page.',
    })
  }

  const secret = process.env.NEXTAUTH_SECRET

  const token = await getToken({
    req,
    secret,
    // Raw gives the un-decoded JWT
    raw: true,
  })

  const query = gql`
    query GetUserName($id: uuid!) {
      users_by_pk(id: $id) {
        name
      }
    }
  `

  const { users_by_pk: user } = await request(
    process.env.HASURA_PROJECT_ENDPOINT!,
    query,
    { id: session.user?.id },
    { authorization: `Bearer ${token}` }
  )

  return Response.json({
    content: `This is protected content. Your name is ${user.name}`,
  })
}
