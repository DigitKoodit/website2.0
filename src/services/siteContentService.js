import urlTemplate from 'url-template'
import { get, post, put, del } from '../api/apiHelper'

const sitePageBaseUrl = '/api/content/{sitePageId}'
const sitePageTemplate = urlTemplate.parse(sitePageBaseUrl)
const siteNavigationBaseUrl = '/api/content/navigation'

const addBodyPayload = data => ({
  body: JSON.stringify(data)
})

const fetchAll = () =>
  get(sitePageBaseUrl)

const fetchById = id =>
  get(sitePageTemplate.expand({ sitePageId: id }))

const create = data =>
  post(sitePageTemplate.expand({}), addBodyPayload(data))

const update = data =>
  put(sitePageTemplate.expand({ sitePageId: data.id }), addBodyPayload(data))

const performDelete = data =>
  del(sitePageTemplate.expand({ sitePageId: data.id }))

const fetchNavigation = () =>
  get(siteNavigationBaseUrl)

export {
  fetchAll,
  fetchById,
  create,
  update,
  performDelete,
  fetchNavigation
}
