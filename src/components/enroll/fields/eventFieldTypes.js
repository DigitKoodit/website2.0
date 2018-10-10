export const types = [
  'text',
  'radio',
  'checkbox',
  'select'
]

export const options = {
  text: {
    value: '',
    fieldName: 'Tekstikenttä',
    type: 'text',
    placeholder: null,
    maxLength: 64,
    lines: 1
  },
  radio: {
    value: [
      {
        name: null,
        label: null,
        default: false,
        value: false
      }
    ],
    fieldName: 'Monivalinta',
    type: 'radio'
  },
  checkbox: {
    value: [
      {
        name: null,
        label: null,
        default: false,
        value: false
      }
    ],
    fieldName: 'Valintaruudut',
    type: 'checkbox'
  },
  select: {
    value: [
      {
        name: null,
        label: null,
        default: false,
        value: null
      }
    ],
    fieldName: 'Avattava',
    type: ''
  }
}

export const base = {
  type: undefined,
  name: undefined,
  label: undefined,
  required: false,
  public: false,
  order: undefined,
  reserveCount: 0,
  reserveEndAt: undefined,
  maxParticipants: undefined,
  value: undefined
}
