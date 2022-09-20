import { useContext } from 'react'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@pancakeswap/wagmi'
import NoWalletConnected from './WalletNotConnected'
import { ProfileCreationContext } from './contexts/ProfileCreationProvider'
import ProfilePicture from './ProfilePicture'
import UserName from './UserName'

const Steps = () => {
  const { t } = useTranslation()
  const { isInitialized, currentStep } = useContext(ProfileCreationContext)
  const { account } = useWeb3React()

  if (!account) {
    return <NoWalletConnected />
  }

  if (!isInitialized) {
    return <div>{t('Loading...')}</div>
  }

  if (currentStep === 1) {
    return <ProfilePicture />
  }

  if (currentStep === 3) {
    return <UserName />
  }

  return null
}

export default Steps
