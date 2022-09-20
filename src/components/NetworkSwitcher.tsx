import { Box, ModalV2, Text, UserMenu, UserMenuDivider, UserMenuItem } from '@pancakeswap/uikit'
import { NATIVE } from '@savvydex/sdk'
import useActiveWeb3React, { useNetworkConnectorUpdater } from 'hooks/useActiveWeb3React'
import Image from 'next/image'
import { useMemo } from 'react'
import { chains } from 'utils/wagmi'
import { WrongNetworkModal } from './WrongNetworkModal'

export const NetworkSelect = ({ switchNetwork }) => {
  return (
    <>
      <Box px="16px" py="8px">
        <Text>Select a Network</Text>
      </Box>
      <UserMenuDivider />
      {chains.map((chain) => (
        <UserMenuItem key={chain.id} style={{ justifyContent: 'flex-start' }} onClick={() => switchNetwork(chain.id)}>
          <Image width={24} height={24} src={`/images/chains/${chain.id}.png`} unoptimized />
          <Text pl="12px">{chain.name}</Text>
        </UserMenuItem>
      ))}
    </>
  )
}

export const NetworkSwitcher = () => {
  const { chainId, chain, connector } = useActiveWeb3React()
  const { isLoading, switchNetwork, pendingChainId } = useNetworkConnectorUpdater()
  const foundChain = useMemo(
    () => chains.find((c) => c.id === (isLoading ? pendingChainId || chainId : chainId)),
    [isLoading, pendingChainId, chainId],
  )
  const symbol = NATIVE[foundChain?.id]?.symbol ?? foundChain?.nativeCurrency?.symbol

  const isWrongNetwork = chain?.unsupported

  const isWalletConnect = connector?.id === 'walletConnect'

  return (
    <>
      <UserMenu
        variant={isLoading ? 'pending' : isWrongNetwork ? 'danger' : 'default'}
        avatarSrc={`/images/chains/${chainId}.png`}
        disabled={isWalletConnect}
        text={
          isLoading ? (
            'Requesting'
          ) : isWrongNetwork ? (
            'Network'
          ) : foundChain ? (
            <>
              <Box display={['none', null, null, null, null, 'block']}>{foundChain.name}</Box>
              <Box display={['block', null, null, null, null, 'none']}>{symbol}</Box>
            </>
          ) : (
            'Select a Network'
          )
        }
      >
        {() => <NetworkSelect switchNetwork={switchNetwork} />}
      </UserMenu>
      <ModalV2 isOpen={isWrongNetwork} closeOnOverlayClick={false}>
        <WrongNetworkModal />
      </ModalV2>
    </>
  )
}
