export const types = [
  'text',
  'radio',
  'checkbox',
  'select'
]

export const options = {
  text: {
    fieldName: 'Teksti',
    type: 'text',
    placeholder: null,
    maxLength: 64,
    lines: 1
  },
  radio: {
    options: [
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
    options: [
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
    options: [
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
    type: 'select'
  }
}

export const base = {
  type: null,
  name: null,
  label: null,
  required: false,
  public: false,
  order: null
}
