import { Heading, ModalCloseButton, ModalHeader, ModalTitle } from '@pancakeswap/uikit'
import { StyledModalBody, StyledModalContainer } from 'components/SearchModal/CurrencySearchModal'

type Props = {
  data?: any
}

const ListTokenModal = (props: Props) => {
  const onDismiss = () => {
    console.log('123 :>> ', 123)
  }
  return (
    <StyledModalContainer minWidth="320px">
      <ModalHeader>
        <ModalTitle>
          <Heading>Token</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <StyledModalBody>abc</StyledModalBody>
    </StyledModalContainer>
  )
}

export default ListTokenModal
