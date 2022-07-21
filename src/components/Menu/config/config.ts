import {
  EarnFillIcon,
  EarnIcon,
  MenuItemsType,
  NftFillIcon,
  NftIcon,
  SwapFillIcon,
  SwapIcon,
  DropdownMenuItemType,
  MoreIcon,
} from '@pancakeswap/uikit'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'
import { ContextApi } from 'contexts/Localization/types'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean } & {
  items?: ConfigMenuDropDownItemsType[]
}

const config: (t: ContextApi['t'], languageCode?: string) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade'),
    icon: SwapIcon,
    fillIcon: SwapFillIcon,
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Swap'),
        href: '/swap',
      },

      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Earn'),
    href: '/farms',
    icon: EarnIcon,
    fillIcon: EarnFillIcon,
    items: [
      {
        label: t('Farms'),
        href: '/farms',
      },
      {
        label: t('Pools'),
        href: '/pools',
      },
      {
        label: 'Learn to earn',
        href: '/learn-and-earn',
      },
    ],
  },
  {
    label: 'Transfer',
    href: `/transfer`,
    icon: NftIcon,
    fillIcon: NftFillIcon,
    items: [],
  },
  {
    label: '',
    href: '/',
    icon: MoreIcon,
    hideSubNav: true,
    items: [
      {
        label: t('Docs'),
        href: 'https://savvycom.gitbook.io/savvydex/',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
    ],
  },
]

export default config
