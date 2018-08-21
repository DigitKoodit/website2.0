import { get } from '../api/apiHelper'

const profileUrl = '/api/intra/profile'

const fetchProfile = () => get(profileUrl, null, true)

export {
  fetchProfile
}
