import { Heading, ModalCloseButton, ModalHeader, ModalTitle } from '@pancakeswap/uikit'
import { StyledModalBody, StyledModalContainer } from 'components/SearchModal/CurrencySearchModal'

type Props = {
  data?: any
}

const ListTokenModal = (props: Props) => {
  const onDismiss = () => null
  return (
    <StyledModalContainer minWidth="320px">
      <ModalHeader>
        <ModalTitle>
          <Heading>Hello</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <StyledModalBody>abc</StyledModalBody>
    </StyledModalContainer>
  )
}

export default ListTokenModal
