import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'
import { getProviderOrSigner } from 'utils'
import { getSVCContract } from 'utils/contractHelpers'
import { getDecimalAmount } from 'utils/formatBalance'

export const useTransfer = (address: string, amount: string, callback?: () => void) => {
  const [transferHash, setTransferHash] = useState<string>('')
  const { account, library } = useActiveWeb3React()
  const contract = getSVCContract(getProviderOrSigner(library, account))
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
