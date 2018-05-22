import React from 'react';
import mapValues from 'lodash/mapValues';
import find from 'lodash/find';
import inputByType from './fields';
import { removeDuplicates } from '../lib/utils';

const EnrollEvent = ({ name, description, visibleFields, participants, fields, match: { params } }) => {
  const { id } = params;
  if (!name || !id) {
    return (
      <div className="site-container">
        <div className="site-content">
          <div className="row">
            <div className="col-xs-12 margin-1">
              <h1>Tapahtumaa ei löytynyt!</h1>
            </div>
          </div>
        </div>
      </div >
    )
  }

  // Filter unneccessary fields 
  const participantFields = visibleFields.map(visibleField => find(fields, { name: visibleField }));

  return (
    <div className="site-container">
      <div className="site-content">
        <div className="row">
          <div className="col-xs-12 margin-1">
            <h1>{name}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {sanityzeMarkup(description)}
            {renderFields(fields)}
            {renderParticipants(participantFields, participants)}
          </div>
        </div>
      </div>
    </div >
  )
}


// TOOD: Remove unwanted tags (e.g. scripts)  
const sanityzeMarkup = html => <div dangerouslySetInnerHTML={{ __html: html }} />;

// These functions could be used if require in fields/index.js is consuming resources
// const requiredFields = parseFieldTypes(fields).map(fieldType => inputByType(fieldType));
// const parseFieldTypes = fields => removeDuplicates(fields.map(field => field.type))

const renderFields = fields => {
  return fields.map(field => {
    const FieldComponent = inputByType(field.type);
    return <FieldComponent
      key={field.name}
      {...field}
    />
  });
}

const renderParticipants = (fields, participants) => {
  if (!isValidArray(fields)) {
    return <div className='enroll-results-container'><p>Ei sarakkeita</p></div>
  }
  if (!isValidArray(participants)) {
    return <div className='enroll-results-container'><p>Ei osallistujia</p></div>
  }

  const tableHeader = fields.map(field => <th key={field.label}>{field.label}</th>);
  const participantList = participants.map(participant => (
    <tr key={participant.id}>
      {fields.map(field => (
        <td key={field.name}>
          {participant[field.name]}
        </td>
      ))}
    </tr>
  ));
  return (
    <div className='enroll-results-container'>
      <table>
        <thead>
          <tr>
            {tableHeader}
          </tr>
        </thead>
        <tbody>
          {participantList}
        </tbody>
      </table>
    </div>)
}

const isValidArray = array => array && Array.isArray(array) && array.length > 0;

EnrollEvent.defaultProps = {
  name: 'Testieventti',
  description: `<div style="font-family: inherit; white-space: normal;"><h2>Jääräsitsit 2018</h2><p>
  Vanhat kunnon, kunnon hyvät Jääräsitsit saapuvat jälleen hyvän kunnon sitsikansan iloksi! Sitsit ovat tänä vuonna <span style="color: rgb(29, 33, 41); font-family: Helvetica, Arial, sans-serif; font-size: 14px;"><strong>17.2.2018</strong>.</span></p><p>
  Juhlapaikkana toimii tänäkin vuonna Yo-talo B:ssä sijaitseva Osakuntasali, jossa sitsit aloitetaan klo 18.00. Sitsien dresscodena toimii smart casual ja lakkioikeuden ansainneilla teekkarilakki. Varsinainen lysti kustantaa 20 euroa, joka maksetaan paikan päällä.</p><p>
  Vaikka sitsit ovatkin ensisijaisesti vanhemmille opiskelijoille suunnatut, ei varsinaista akateemista alaikärajaa ole. Ilmoittautumislomake kuitenkin suosii aiemmin aloittaneita ja jo tutkintonsa suorittaneita, joten pelkkä ilmoittautumisnopeus ei ratkaise järjestystä. Järjestys saattaakin muuttua ilmojen karttuessa, joten kannattaa tarkistaa oma sijoittuminen ilmon sulkeutuessa.</p><p>
  <strong>TL;DR</strong><br><strong>MITÄ</strong>: Jääräsitsit 2018<br><strong>MISSÄ</strong>: Osakuntasali, Yo-talo B (Rehtorinpellonkatu 4)<br><strong>KOSKA</strong>: 17.2. klo 18.00<br><strong>HINTA</strong>: 20€<br><strong>DRESSCODE</strong>: Smart casual, lakillisilla teekkarilakki</p><h4><strong>Menu</strong>:</h4><p>
  <strong>Alkuruoka</strong>:<br><span style="color: rgb(29, 33, 41); font-family: Helvetica, Arial, sans-serif;">Gazpacho</span>-keittoa</p><p>
  <strong>Pääruoka</strong>:<br>Kievin kanaa, aurinkokuivatuilla tomaateilla maustettua riisiä<br>ja kauden kasviksia<br><strong>TAI</strong><br>Quarn-filettä, aurinkokuivatuilla tomaateilla maustettua riisiä<br>ja kauden kasviksia</p><p>
  <strong>Jälkiruoka</strong>:<br>Pannukakku</p><p>
  Lisäksi kahvi/tee + Jallu + ruokajuomat</p><p>
  <b font-size:="" lucida="" sans="" style="color: rgb(95, 95, 95); font-family: Helvetica, Arial, ">Lisätiedot:</b><span font-size:="" lucida="" sans="" style="color: rgb(95, 95, 95); font-family: Helvetica, Arial, "><a href="mailto:0-kerho@utu.fi">0-kerho@utu.fi</a></span></p></div>`,

  // TODO: prevent field with name "id"
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
        },
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

export default EnrollEvent;