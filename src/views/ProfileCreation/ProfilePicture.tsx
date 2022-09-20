import { AutoRenewIcon, Button, Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useTranslation } from 'contexts/Localization'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import useToast from 'hooks/useToast'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { getPancakeProfileAddress } from 'utils/addressHelpers'
import { getErc721Contract } from 'utils/contractHelpers'
import { ProfileCreationContext } from './contexts/ProfileCreationProvider'
import NextStepButton from './NextStepButton'

const ProfilePicture: React.FC = () => {
  const { library } = useWeb3React()
  const [isApproved, setIsApproved] = useState(false)
  const [userProfileCreationNfts, setUserProfileCreationNfts] = useState(null)
  const { selectedNft, actions } = useContext(ProfileCreationContext)

  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: isApproving } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()

  const handleApprove = async () => {
    const contract = getErc721Contract(selectedNft.collectionAddress, library.getSigner())
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(contract, 'approve', [getPancakeProfileAddress(), selectedNft.tokenId])
    })
    if (receipt?.status) {
      toastSuccess(t('Enabled'), t('Please progress to the next step.'))
      setIsApproved(true)
    }
  }

  if (userProfileCreationNfts?.length === 0) {
    return (
      <>
        <Heading scale="xl" mb="24px">
          {t('Oops!')}
        </Heading>
        <Text bold fontSize="20px" mb="24px">
          {t('We couldn’t find any Pancake Collectibles in your wallet.')}
        </Text>
        <Text as="p">
          {t(
            'You need a Pancake Collectible to finish setting up your profile. If you sold or transferred your starter collectible to another wallet, you’ll need to get it back or acquire a new one somehow. You can’t make a new starter with this wallet address.',
          )}
        </Text>
      </>
    )
  }

  return (
    <>
      <Text fontSize="20px" color="textSubtle" bold>
        {t('Step %num%', { num: 2 })}
      </Text>
      <Heading as="h3" scale="xl" mb="24px">
        {t('Set Profile Picture')}
      </Heading>
      <Card mb="24px">
        <CardBody>
          <Heading as="h4" scale="lg" mb="8px">
            {t('Choose collectible')}
          </Heading>
          <Text as="p" color="textSubtle">
            {t('Choose a profile picture from the eligible collectibles (NFT) in your wallet, shown below.')}
          </Text>
          <Text as="p" color="textSubtle" mb="24px">
            {t('Only approved Pancake Collectibles can be used.')}
          </Text>

          <Heading as="h4" scale="lg" mb="8px">
            {t('Allow collectible to be locked')}
          </Heading>
          <Text as="p" color="textSubtle" mb="16px">
            {t(
              "The collectible you've chosen will be locked in a smart contract while it’s being used as your profile picture. Don't worry - you'll be able to get it back at any time.",
            )}
          </Text>
          <Button
            isLoading={isApproving}
            disabled={isApproved || isApproving || selectedNft.tokenId === null}
            onClick={handleApprove}
            endIcon={isApproving ? <AutoRenewIcon spin color="currentColor" /> : undefined}
            id="approveStarterCollectible"
          >
            {t('Enable')}
          </Button>
        </CardBody>
      </Card>
      <NextStepButton onClick={actions.nextStep} disabled={selectedNft.tokenId === null || !isApproved || isApproving}>
        {t('Next Step')}
      </NextStepButton>
    </>
  )
}

export default ProfilePicture
