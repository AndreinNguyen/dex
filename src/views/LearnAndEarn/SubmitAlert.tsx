import { Button, ErrorIcon, Flex, InjectedModalProps } from '@pancakeswap/uikit'
import { Done } from '@styled-icons/material/Done'
import { StyledModalContainer } from './style'

interface Props extends InjectedModalProps {
  type: 'error' | 'success'
  message: string
  onClaim?: () => void
}

const SubmitAlert = ({ onDismiss, type, message, onClaim }: Props) => {
  return (
    <StyledModalContainer
      title="Notify"
      headerBackground="gradients.cardHeader"
      onDismiss={onDismiss}
      style={{ maxWidth: '420px' }}
    >
      <Flex p={20} justifyContent="center" flexDirection="column" alignItems="center">
        {type === 'error' && <ErrorIcon width="60px" color="#ff3333" />}
        {type === 'success' && <Done size={60} color="#4BB543" />}
        <p className="message">{message}</p>
      </Flex>
      {onClaim && (
        <Flex justifyContent="center">
          <Button onClick={onClaim}>Claim reward</Button>
        </Flex>
      )}
    </StyledModalContainer>
  )
}

export default SubmitAlert
