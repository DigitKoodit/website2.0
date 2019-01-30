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
    isTextarea: false
  },
  radio: {
    options: [
      {
        name: null,
        label: null,
        isDefault: false,
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
