import { ArrowUpIcon, Button, Link, Modal, Spinner, Text } from '@pancakeswap/uikit'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'
import { ConfirmationPendingContent, TransactionErrorContent } from 'components/TransactionConfirmationModal'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getBscScanLink } from 'utils'
import { ApproveModalStatus } from 'views/Bridge'

type Props = {
  onDismiss?: () => void
  approveStatus: ApproveModalStatus
  transactionInfo
}

const Wrapper = styled.div`
  width: 100%;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 24px 0;
`

const ApproveCompletedModal = () => {
  return (
    <Wrapper>
      <ConfirmedIcon>
        <Spinner />
      </ConfirmedIcon>
      <AutoColumn gap="12px" justify="center">
        <Text fontSize="20px">Waiting for transactions</Text>
        <AutoColumn gap="12px" justify="center">
          {/* <Text bold small textAlign="center">
            ''
          </Text> */}
        </AutoColumn>
      </AutoColumn>
    </Wrapper>
  )
}

const SwapConfirmationModal = ({ hash, onDismiss }) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  return (
    <Wrapper>
      <ConfirmedIcon>
        <ArrowUpIcon width="120px" color="#f6b24f" />
      </ConfirmedIcon>
      <AutoColumn gap="12px" justify="center">
        <Text fontSize="20px">Transaction Submitted</Text>
        <AutoColumn gap="12px" justify="center">
          {chainId && hash && (
            <Link external small href={getBscScanLink(hash, 'transaction', chainId)}>
              {t('View on BscScan')}
            </Link>
          )}
          <Button onClick={onDismiss}>Close</Button>
        </AutoColumn>
      </AutoColumn>
    </Wrapper>
  )
}

const PendingApproveModal = ({ onDismiss, approveStatus, transactionInfo }: Props) => {
  const [title, setTitle] = useState('Approve Amount')
  useEffect(() => {
    if (approveStatus === ApproveModalStatus.SWAP_COMPLETED) {
      setTitle('Confirm Swap')
    }
  }, [approveStatus])

  useEffect(() => {
    console.log('transactionInfo', transactionInfo)
  }, [transactionInfo])

  const renderModalContent = () => {
    switch (approveStatus) {
      case ApproveModalStatus.PENDING:
        return <ConfirmationPendingContent pendingText="Give permission to access your SVC" />
      case ApproveModalStatus.CONFIRMED:
        return <ApproveCompletedModal />
      case ApproveModalStatus.REJECT:
        return <TransactionErrorContent message="Transaction rejected." onDismiss={onDismiss} />
      case ApproveModalStatus.APPROVE_COMPLETED:
        return <ConfirmationPendingContent pendingText="Confirm Swap SVC from BSC to Polygon" />
      case ApproveModalStatus.SWAP_COMPLETED:
        return <SwapConfirmationModal hash={transactionInfo?.hash} onDismiss={onDismiss} />
      default:
        return <ConfirmationPendingContent pendingText="Give permission to access your SVC" />
    }
  }
  return (
    <Modal title={title} headerBackground="gradients.cardHeader" onDismiss={onDismiss}>
      {renderModalContent()}
    </Modal>
  )
}

export default PendingApproveModal
