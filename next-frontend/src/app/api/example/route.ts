// This is an example of to protect an API route
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'
import { getClient } from '@/app/ApolloClient'
import { GetUserNameDocument } from '../../../../operations/queries.generated'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({
      error:
        'You must be signed in to view the protected content on this page.',
    })
  }

  const {
    data: { users_by_pk: user },
  } = await getClient().query({
    query: GetUserNameDocument,
    variables: { id: session.user?.id },
  })

  return Response.json({
    content: `This is protected content. Your name is ${user?.name}`,
  })
}
