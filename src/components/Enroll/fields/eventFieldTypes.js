export const types = [
  'text',
  'radio',
  'checkbox',
  'select'
]

export const options = {
  text: {
    value: '',
    fieldName: 'Teksti',
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
        isDefault: false,
        value: false,
        maxParticipants: null,
        reserveCount: null
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
        isDefault: false,
        value: false,
        maxParticipants: null,
        reserveCount: null
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
        isDefault: false,
        value: null,
        maxParticipants: null,
        reserveCount: null
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
  value: undefined
}
