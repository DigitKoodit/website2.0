import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { MuiPickersUtilsProvider, InlineDateTimePicker } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'

const dateTimePickerLocale = 'fi'

class DateTimePicker extends PureComponent {
  handleDateChange = date => {
    this.props.onChange(date ? date.format() : null)
  }
  render() {
    const { selectedDate } = this.props
    const dateObject = selectedDate ? moment(selectedDate) : null
    return (
      <>
        <div className='picker'>
          <MuiPickersUtilsProvider utils={MomentUtils} locale={dateTimePickerLocale}>
            <InlineDateTimePicker
              keyboard
              ampm={false}
              value={dateObject}
              onChange={this.handleDateChange}
              onError={console.log}
              clearable
              invalidDateMessage='Viallinen aika'
              format='DD.MM.YYYY HH:mm'
            />
          </MuiPickersUtilsProvider>
        </div>
      </>
    )
  }
  static propTypes = {
    selectedDate: PropTypes.string,
    onChange: PropTypes.func.isRequired

  }
}

export default DateTimePicker
