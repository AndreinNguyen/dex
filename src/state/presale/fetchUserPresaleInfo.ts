import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { SAVVYDEX_API } from 'config/constants/endpoints'

const fetchUserPresaleInfo = async () => {
  // const response = await axios.get(`${SAVVYDEX_API}/questions`)
  const response = await axios.get('https://62fc9e6ab9e38585cd423a52.mockapi.io/api/v1/presale/presale')
  return camelcaseKeys(response.data, { deep: true })
}

export default fetchUserPresaleInfo
