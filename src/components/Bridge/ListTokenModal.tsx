import { Flex, Heading, ModalCloseButton, ModalHeader, ModalTitle, Text } from '@pancakeswap/uikit'
import MenuItem from '@pancakeswap/uikit/src/components/MenuItem/MenuItem'
import Column from 'components/Layout/Column'
import Row from 'components/Layout/Row'
import { StyledModalBody, StyledModalContainer } from 'components/SearchModal/CurrencySearchModal'
import styled from 'styled-components'
import { networkSupportBridge } from './bridgeConfig'

type Props = {
  data?: any
  onDismiss?: () => void
  setDataToken
}

const MenuItemStyle = styled(MenuItem)`
  transition: ease-out 0.2s;
  &:hover {
    cursor: pointer;
    background-color: #ffffff26;
  }
`

const ListTokenModal = ({ onDismiss, setDataToken }: Props) => {
  const handleSelectNetwork = (data) => {
    setDataToken(data)
    onDismiss()
  }
  return (
    <StyledModalContainer minWidth="320px">
      <ModalHeader>
        <ModalTitle>
          <Heading>Network</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <StyledModalBody>
        {Object.keys(networkSupportBridge).map((key, index) => (
          <MenuItemStyle key={key}>
            <Column>
              <Row onClick={() => handleSelectNetwork(networkSupportBridge[key])}>
                <img src={networkSupportBridge[key].logo} alt="" />
                <Text marginLeft="10px" bold>
                  {networkSupportBridge[key].name}
                </Text>
              </Row>
            </Column>
          </MenuItemStyle>
        ))}
      </StyledModalBody>
    </StyledModalContainer>
  )
}

export default ListTokenModal
