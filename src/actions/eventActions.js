import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/helpers'
import createCrudService from '../services/createCrudService'
import { displaySnackbar } from './uiActions'
import { INITIAL_ID } from '../constants'
import { displayErrorMessage, isUnauthorized, parseResponseError } from './helpers'

import { loginActions } from '.'

const eventPublicCrud = createCrudService('/api/event')
const eventPrivateCrud = createCrudService('/api/intra/event', true)
const initialItem = {
  id: 'Event1',
  name: 'Testieventti',
  description: `<div style='font-family: inherit white-space: normal'><h2>Jääräsitsit 2018</h2><p>
  Vanhat kunnon, kunnon hyvät Jääräsitsit saapuvat jälleen hyvän kunnon sitsikansan iloksi! Sitsit ovat tänä vuonna <span style='color: rgb(29, 33, 41) font-family: Helvetica, Arial, sans-serif font-size: 14px'><strong>17.2.2018</strong>.</span></p><p>
  Juhlapaikkana toimii tänäkin vuonna Yo-talo B:ssä sijaitseva Osakuntasali, jossa sitsit aloitetaan klo 18.00. Sitsien dresscodena toimii smart casual ja lakkioikeuden ansainneilla teekkarilakki. Varsinainen lysti kustantaa 20 euroa, joka maksetaan paikan päällä.</p><p>
  Vaikka sitsit ovatkin ensisijaisesti vanhemmille opiskelijoille suunnatut, ei varsinaista akateemista alaikärajaa ole. Ilmoittautumislomake kuitenkin suosii aiemmin aloittaneita ja jo tutkintonsa suorittaneita, joten pelkkä ilmoittautumisnopeus ei ratkaise järjestystä. Järjestys saattaakin muuttua ilmojen karttuessa, joten kannattaa tarkistaa oma sijoittuminen ilmon sulkeutuessa.</p><p>
  <strong>TLDR</strong><br><strong>MITÄ</strong>: Jääräsitsit 2018<br><strong>MISSÄ</strong>: Osakuntasali, Yo-talo B (Rehtorinpellonkatu 4)<br><strong>KOSKA</strong>: 17.2. klo 18.00<br><strong>HINTA</strong>: 20€<br><strong>DRESSCODE</strong>: Smart casual, lakillisilla teekkarilakki</p><h4><strong>Menu</strong>:</h4><p>
  <strong>Alkuruoka</strong>:<br><span style='color: rgb(29, 33, 41) font-family: Helvetica, Arial, sans-serif'>Gazpacho</span>-keittoa</p><p>
  <strong>Pääruoka</strong>:<br>Kievin kanaa, aurinkokuivatuilla tomaateilla maustettua riisiä<br>ja kauden kasviksia<br><strong>TAI</strong><br>Quarn-filettä, aurinkokuivatuilla tomaateilla maustettua riisiä<br>ja kauden kasviksia</p><p>
  <strong>Jälkiruoka</strong>:<br>Pannukakku</p><p>
  Lisäksi kahvi/tee + Jallu + ruokajuomat</p><p>
  <b font-size:='' lucida='' sans='' style='color: rgb(95, 95, 95) font-family: Helvetica, Arial, '>Lisätiedot:</b><span font-size:='' lucida='' sans='' style='color: rgb(95, 95, 95) font-family: Helvetica, Arial, '><a href='mailto:0-kerho@utu.fi'>0-kerho@utu.fi</a></span></p></div>`,

  // TODO: prevent field with name 'id'
  fields: [
    {
      type: 'radio',
      name: 'juomat',
      label: 'Juomapuoli',
      required: true,
      order: 2,
      options: {},
      value: [
        {
          name: 'radio1',
          label: 'Alkoholiton',
          default: false,
          value: false
        },
        {
          name: 'radio2',
          label: 'Alkoholillinen',
          default: true,
          value: true
        }
      ]
    },
    {
      type: 'checkbox',
      name: 'monivalinta',
      label: 'Monivalinta',
      required: false,
      order: 4,
      options: {},
      value: [
        {
          name: 'check1',
          label: 'Yksi',
          default: false,
          value: false
        },
        {
          name: 'check2',
          label: 'Kaksi',
          default: true,
          value: true
        },
        {
          name: 'check3',
          label: 'Kolme',
          default: false,
          value: true
        }
      ]
    },
    {
      type: 'select',
      name: 'lista',
      label: 'Lista listoista',
      required: false,
      order: 3,
      options: {},
      value: [
        {
          name: 'lista1',
          label: null,
          default: false,
          value: 'Lattialista'
        },
        {
          name: 'lista2',
          label: null,
          default: false,
          value: 'Kattolista'
        },
        {
          name: 'lista3',
          label: null,
          default: true,
          value: 'listalista'
        }
      ]
    },
    {
      type: 'text',
      name: 'etunimi',
      label: 'Etunimi',
      required: true,
      order: 0,
      options: {
        placeholder: 'Etunimi',
        maxLength: 64,
        lines: 1
      },
      value: ''
    },
    {
      type: 'text',
      name: 'teksti',
      label: 'Pitkä teksti',
      required: true,
      order: 1,
      options: {
        placeholder: 'Tekstiä',
        maxLength: 256,
        lines: 5
      },
      value: ''
    }
  ],
  visibleFields: [
    'etunimi',
    'juomat',
    'lista',
    'teksti'
  ],
  participants: [
    {
      id: '11',
      etunimi: 'Pertti',
      juomat: 'Alkoholillinen',
      lista: 'Kattolista',
      teksti: 'Vastaus',
      monivalinta: 'Kolme'
    }
  ]
}

const EVENT = createCrudTypes(actionKeys.event)
const singular = 'Tapahtuman'
const plural = 'Tapahtumien'

const enrollActions = {
  pending: (crudType) => createAction(EVENT[crudType].PENDING),
  success: (response, crudType) => createAction(EVENT[crudType].SUCCESS, { response }),
  error: (error, crudType) => createAction(EVENT[crudType].ERROR, { error }),
  fetchEvent(eventId) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      eventPublicCrud.fetchById(eventId)
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = `${singular} noutaminen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.FETCH))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/'))
          })
        })
    }
  },
  fetchEvents(attemptAuthorizedRoute) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      const api = attemptAuthorizedRoute ? eventPrivateCrud : eventPublicCrud
      api.fetchAll()
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = `${plural} noutaminen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.FETCH))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  },
  prepareNew() {
    return (dispatch, getState) => !getState().event.records.find(item => item.id === INITIAL_ID) && dispatch(this.success(initialItem, crudTypes.CREATE))
  },
  addProduct(product) {
    return dispatch => {
      dispatch(this.pending(crudTypes.CREATE))
      eventPrivateCrud.create(product)
        .then(response => {
          dispatch(this.success(response, crudTypes.CREATE))
          // newly added item has to have negative id created in prepareNew()
          product.id < 0 && dispatch(this.success(product, crudTypes.DELETE)) // remove temporary item
          product.id < 0 && dispatch(displaySnackbar(`${singular} luominen onnistui`))
        }).catch(err => {
          const message = `${singular} luominen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.CREATE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  },
  updateProduct(product) {
    return dispatch => {
      dispatch(this.pending(crudTypes.UPDATE))
      eventPrivateCrud.update(product)
        .then(response => {
          dispatch(this.success(response, crudTypes.UPDATE))
          dispatch(displaySnackbar(`${singular} tallentaminen onnistui`))
        }).catch(err => {
          const message = `${singular} päivitys epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.UPDATE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/'))
          })
        })
    }
  },
  removeProduct(product) {
    return dispatch => {
      const isUnsavedItem = product.id < 0
      if(isUnsavedItem) {
        return dispatch(this.success(product, crudTypes.DELETE))
      }
      dispatch(this.pending(crudTypes.DELETE))
      eventPrivateCrud.performDelete(product)
        .then(() => {
          dispatch(this.success(product, crudTypes.DELETE))
          dispatch(displaySnackbar(`${singular} poistaminen onnistui`))
        }).catch(err => {
          const message = `${singular} poistaminen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.DELETE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/'))
          })
        })
    }
  }
}

export default enrollActions
export { EVENT }
