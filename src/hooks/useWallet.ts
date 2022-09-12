import { ConnectorNames, useWalletModal, walletConnectors } from '@pancakeswap/uikit'
import { useMemo } from 'react'
import { useConnect } from 'wagmi'
import { useTranslation } from 'contexts/Localization'
import useAuth from './useAuth'

export const useWallet = () => {
  const { connectors } = useConnect()
  const { login, logout } = useAuth()
  const { t } = useTranslation()

  const finalConnectors = useMemo(() => {
    return walletConnectors.map((config) => {
      const found = connectors.find((c) => c.id === config.connectorId)
      if (!found.ready) {
        if (config.connectorId === ConnectorNames.Injected) {
          return {
            ...config,
            connectorId: ConnectorNames.Injected,
          }
        }
        return {
          ...config,
          priority: 999,
        }
      }
      return config
    })
  }, [connectors])

  const { onPresentConnectModal } = useWalletModal(login, logout, t, finalConnectors)

  return { onPresentConnectModal }
}
