import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { SAVVYDEX_API } from 'config/constants/endpoints'
import { ResTransaction } from 'state/types'

const fetchUserPresaleTransaction = async (acount: string): Promise<ResTransaction[]> => {
  const response = await axios.get(`${SAVVYDEX_API}/transactions`, {
    params: {
      receiver: acount,
    },
  })

  return camelcaseKeys(response.data.data.data, { deep: true })
}

export default fetchUserPresaleTransaction
