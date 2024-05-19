'use client'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from '@nextui-org/react'
import { RiCloseLine, RiUserAddLine } from '@remixicon/react'
import React, { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { addFriend } from '../actions'
import toast from 'react-hot-toast'

const initialState: {
  message?: string
  errorMessage?: string
} = {}

function AddFriendButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      startContent={<RiUserAddLine />}
      color="primary"
      type="submit"
      isLoading={pending}
    >
      Add
    </Button>
  )
}

interface IProps extends Omit<ModalProps, 'children'> {
  onAddFriendClose: () => void
}

export default function AddFriendModal({ onAddFriendClose, ...props }: IProps) {
  const [state, formAction] = useFormState(addFriend, initialState)

  useEffect(() => {
    if (!state.message) return
    toast.success(state.message)
    onAddFriendClose()
  }, [onAddFriendClose, state.message])

  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <form action={formAction}>
            <ModalHeader className="flex flex-col gap-1">
              Add a Friend
            </ModalHeader>
            <ModalBody>
              <p>You can add friends with their emails.</p>
              <Input
                autoFocus
                label="Email"
                name="email"
                placeholder="Enter your friend's email"
                variant="bordered"
                isRequired
                type="email"
              />
              <p className="text-danger">{state.errorMessage}</p>
              <p aria-live="polite" className="sr-only" role="status">
                {state.message}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                startContent={<RiCloseLine />}
                color="danger"
                variant="flat"
                onPress={onClose}
              >
                Close
              </Button>
              <AddFriendButton />
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
