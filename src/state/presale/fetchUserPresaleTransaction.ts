import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { ApiEndpoints } from 'config/constants/endpoints'
import { ChainId } from '@savvydex/sdk'
import { ResTransaction } from 'state/types'

const fetchUserPresaleTransaction = async (acount: string, chainId: ChainId): Promise<ResTransaction[]> => {
  const response = await axios.get(`${ApiEndpoints[chainId]}/transactions`, {
    params: {
      receiver: acount,
    },
  })

  return camelcaseKeys(response.data.data.data, { deep: true })
}

export default fetchUserPresaleTransaction
