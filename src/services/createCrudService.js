import urlTemplate from 'url-template'
import { get, post, put, del } from '../api/apiHelper'

const addBodyPayload = data => ({ body: JSON.stringify(data) })

const createCrudService = (baseUrl, requireAuth = false) => {
  const baseUrlTemplate = urlTemplate.parse(`${baseUrl}/{id}`)
  const fetchAll = () =>
    get(baseUrl, requireAuth)

  const fetchById = id =>
    get(baseUrlTemplate.expand({ id }), requireAuth)

  const create = data =>
    post(baseUrlTemplate.expand({}), addBodyPayload(data), requireAuth)

  const update = data =>
    put(baseUrlTemplate.expand({ id: data.id }), addBodyPayload(data), requireAuth)

  const performDelete = data =>
    del(baseUrlTemplate.expand({ id: data.id }), null, requireAuth)

  return {
    fetchAll,
    fetchById,
    create,
    update,
    performDelete
  }
}

export default createCrudService
