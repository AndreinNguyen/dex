import BigNumber from 'bignumber.js'
import { SVC } from 'config/constants/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTokenContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { getDecimalAmount } from 'utils/formatBalance'

interface TransferProps {
  transferHandler: () => void
  transferHash: string
}

export const useTransfer = (address: string, amount: string, callback?: () => void): TransferProps => {
  const [transferHash, setTransferHash] = useState<string>('')
  const { chainId } = useActiveWeb3React()
  const contract = useTokenContract(SVC[chainId].address)
  const transferHandler = async () => {
    try {
      const transferAmount = getDecimalAmount(new BigNumber(amount)).toString()
      const recieverAddress = address
      const tx = await contract.transfer(recieverAddress, transferAmount)
      setTransferHash(tx.hash)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (transferHash) {
      callback()
    }
  }, [transferHash])

  return { transferHandler, transferHash }
}
