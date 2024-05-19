'use server'

import { z } from 'zod'
import { UserByEmailDocument } from '../../operations/queries.generated'
import { getClient } from './ApolloClient'
import { AddFriendDocument } from '../../operations/mutations.generated'
import { Friend_Status_Enum } from '../../components/types.generated'
import { ApolloError } from '@apollo/client'

export async function addFriend(
  prevState: {
    message?: string
    errorMessage?: string
  },
  formData: FormData
) {
  const schema = z.object({ email: z.string().email() })
  const result = schema.safeParse({
    email: formData.get('email'),
  })
  if (!result.success) {
    const errorMessage = result.error.issues.reduce(
      (acc, issue) => acc + issue.message + '\n',
      ''
    )
    return { errorMessage }
  }
  try {
    const apolloClient = getClient()
    const {
      data: {
        users: [toUser],
      },
    } = await apolloClient.query({
      query: UserByEmailDocument,
      variables: { email: result.data.email },
    })

    if (!toUser) {
      // I do not want to send an explicit error on purpose here
      return { errorMessage: 'Something went wrong' }
    }

    await apolloClient.mutate({
      mutation: AddFriendDocument,
      variables: { status: Friend_Status_Enum.Pending, toUserId: toUser.id },
    })

    return { message: 'Friend request sent' }
  } catch (e) {
    if (e instanceof ApolloError) {
      if (e.graphQLErrors[0].extensions.code === 'constraint-violation') {
        return {
          errorMessage: 'You already sent a friend request to this user',
        }
      }
    }
    console.error(e)
    return { errorMessage: 'Internal Server Error' }
  }
}
