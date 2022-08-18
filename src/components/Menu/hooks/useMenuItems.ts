import { usePresaleInfo } from 'state/presale/hooks'
import { useMemo } from 'react'
import { menuStatus, NftFillIcon, NftIcon } from '@pancakeswap/uikit'
import { useTranslation } from '../../../contexts/Localization'
import { useMenuItemsStatus } from './useMenuItemsStatus'
import config, { ConfigMenuItemsType } from '../config/config'

export const useMenuItems = (): ConfigMenuItemsType[] => {
  const { isInWhiteList } = usePresaleInfo()

  const {
    t,
    currentLanguage: { code: languageCode },
  } = useTranslation()
  const menuItemsStatus = useMenuItemsStatus()

  const menuItems = useMemo((): ConfigMenuItemsType[] => {
    if (!isInWhiteList) {
      return config(t, languageCode)
    }
    const presale: ConfigMenuItemsType = {
      label: 'Presale',
      href: `/presale`,
      icon: NftIcon,
      fillIcon: NftFillIcon,
      showItemsOnMobile: false,
      items: [],
    }
    return [...config(t, languageCode), presale]
  }, [isInWhiteList, t, languageCode])

  return useMemo(() => {
    if (menuItemsStatus && Object.keys(menuItemsStatus).length) {
      return menuItems.map((item) => {
        const innerItems = item.items.map((innerItem) => {
          const itemStatus = menuItemsStatus[innerItem.href]
          if (itemStatus) {
            let itemMenuStatus
            if (itemStatus === 'soon') {
              itemMenuStatus = menuStatus.SOON
            } else if (itemStatus === 'live') {
              itemMenuStatus = menuStatus.LIVE
            } else {
              itemMenuStatus = menuStatus.NEW
            }
            return { ...innerItem, status: itemMenuStatus }
          }
          return innerItem
        })
        return { ...item, items: innerItems }
      })
    }
    return menuItems
  }, [menuItems, menuItemsStatus])
}
