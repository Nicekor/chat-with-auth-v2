'use client'
import { signOut, useSession } from 'next-auth/react'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react'
import {
  RemixiconComponentType,
  RiCameraLine,
  RiGroupLine,
  RiLogoutBoxLine,
  RiNotificationLine,
  RiUserAddLine,
} from '@remixicon/react'
import { ThemeSwitcher } from './ThemeSwitcher'
import AddFriendModal from './AddFriendModal'

enum MenuOption {
  FRIEND_REQUESTS = 'friend-requests',
  ADD_FRIEND = 'add-friend',
  UPLOAD_AVATAR = 'upload-avatar',
  LOGOUT = 'logout',
}

const menuOptions: Record<
  MenuOption,
  { label: string; Icon: RemixiconComponentType }
> = {
  [MenuOption.FRIEND_REQUESTS]: {
    label: 'Friend Requests',
    Icon: RiGroupLine,
  },
  [MenuOption.ADD_FRIEND]: { label: 'Add Friend', Icon: RiUserAddLine },
  [MenuOption.UPLOAD_AVATAR]: { label: 'Upload avatar', Icon: RiCameraLine },
  [MenuOption.LOGOUT]: { label: 'Log out', Icon: RiLogoutBoxLine },
}

export default function NavMenu() {
  const { data: session } = useSession()
  const {
    isOpen: addFriendsOpen,
    onOpen: onAddFriendsOpen,
    onOpenChange: onAddFriendsOpenChange,
    onClose: onAddFriendClose,
  } = useDisclosure()

  const onMenuAction = (key: MenuOption) => {
    switch (key) {
      case MenuOption.ADD_FRIEND: {
        onAddFriendsOpen()
        break
      }
      case MenuOption.LOGOUT: {
        signOut()
        break
      }
    }
  }

  return (
    <nav className="flex items-center p-2 justify-between">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly>
            <Avatar
              showFallback
              name={session?.user?.name?.[0].toUpperCase()}
              src="https://images.unsplash.com/broken"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => onMenuAction(key as MenuOption)}
          aria-label="Static Actions"
        >
          {Object.values(MenuOption).map((option) => {
            const currentOption = menuOptions[option]
            return (
              <DropdownItem key={option} startContent={<currentOption.Icon />}>
                {currentOption.label}
              </DropdownItem>
            )
          })}
        </DropdownMenu>
      </Dropdown>

      <div className="flex items-center gap-4">
        <Button isIconOnly variant="light">
          <RiNotificationLine />
        </Button>
        <ThemeSwitcher />
      </div>
      <AddFriendModal
        isOpen={addFriendsOpen}
        onOpenChange={onAddFriendsOpenChange}
        onAddFriendClose={onAddFriendClose}
        placement="top-center"
      />
    </nav>
  )
}
