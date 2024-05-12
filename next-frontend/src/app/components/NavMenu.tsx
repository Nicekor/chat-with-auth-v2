'use client'
import { signOut, useSession } from 'next-auth/react'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import {
  RemixiconComponentType,
  RiCameraLine,
  RiGroupLine,
  RiLogoutBoxLine,
  RiUserAddLine,
} from '@remixicon/react'
import { ThemeSwitcher } from './ThemeSwitcher'

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

  const onMenuAction = (key: MenuOption) => {
    switch (key) {
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

      <ThemeSwitcher />
    </nav>
  )
}
