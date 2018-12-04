import { get } from '../api/apiHelper'

const profileUrl = '/api/intra/profiles'

const fetchProfile = () => get(profileUrl, null, true)

export {
  fetchProfile
}
