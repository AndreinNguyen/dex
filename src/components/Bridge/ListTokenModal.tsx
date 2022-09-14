import { Heading, ModalCloseButton, ModalHeader, ModalTitle } from '@pancakeswap/uikit'
import { StyledModalBody, StyledModalContainer } from 'components/SearchModal/CurrencySearchModal'
import { networkSupportBridge } from './bridgeConfig'

type Props = {
  data?: any
  onDismiss?: () => void
}

const ListTokenModal = ({ onDismiss }: Props) => {
  return (
    <StyledModalContainer minWidth="320px">
      <ModalHeader>
        <ModalTitle>
          <Heading>Token</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <StyledModalBody>
        {Object.keys(networkSupportBridge).map((key, index) => (
          <div>{networkSupportBridge[key].name}</div>
        ))}
      </StyledModalBody>
    </StyledModalContainer>
  )
}

export default ListTokenModal
