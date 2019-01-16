import urlTemplate from 'url-template'
import { get, post, put, del } from '../api/apiHelper'

const addBodyPayload = data => ({ body: JSON.stringify(data) })

const createCrudService = (baseUrl, requireAuth = false) => {
  const baseUrlTemplate = urlTemplate.parse(baseUrl)
  const baseUrlIdTemplate = urlTemplate.parse(`${baseUrl}/{id}`)
  const fetchAll = (params) =>
    get(baseUrlTemplate.expand(params), null, requireAuth)

  const fetchById = (id, params) =>
    get(baseUrlIdTemplate.expand({ ...params, id }), null, requireAuth)

  const create = (data, params) =>
    post(baseUrlIdTemplate.expand(params), addBodyPayload(data), requireAuth)

  const update = (data, params) =>
    put(baseUrlIdTemplate.expand({ ...params, id: data.id }), addBodyPayload(data), requireAuth)

  const performDelete = (data, params) =>
    del(baseUrlIdTemplate.expand({ ...params, id: data.id }), null, requireAuth)

  return {
    fetchAll,
    fetchById,
    create,
    update,
    performDelete
  }
}

export default createCrudService
