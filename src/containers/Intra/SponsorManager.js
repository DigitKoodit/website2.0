import React, { Component } from 'react'
import PropTypes from 'prop-types' //
import { connect } from 'react-redux'
import moment from 'moment'
import { Route, Switch } from 'react-router-dom'
import { Column, Title, Columns, Box, Button, MenuLink } from 'bloomer'
import isNil from 'lodash/isNil'
import { sponsorActions } from '../../actions'
import DateTimePicker from '../../components/DateTimePicker'
import { BaseContent, VerticalList } from '../../components/Layout'
import ModelEditor, { EditorField, EditorInput } from '../../components/Intra/ModelEditor'
import { getArraySortedBy } from '../../selectors/generalSelectors'
import { findSponsorById } from '../../selectors/sponsorSelectors'
import { INITIAL_ID } from '../../constants'
import { isNewlyCreated, includesNewlyCreated, urlDisplayId } from '../../store/helpers'

const rootPath = '/intra/cms/sponsors'

class SponsorManager extends Component {
  componentDidMount() {
    this.props.fetchSponsors()
  }

  componentDidUpdate = prevProps => {
    const { sponsors } = this.props
    if(prevProps.sponsors.length < sponsors.length && includesNewlyCreated(sponsors)) {
      this.handleActiveItemChange(INITIAL_ID)
    }
  }

  handleActiveItemChange = itemId => {
    this.props.openForEdit(urlDisplayId(itemId))
    this.props.clearErrors()
  }

  clearSelection = () => {
    this.props.closeEditor()
    this.props.clearErrors()
  }
  renderEditor = (item, validationErrors) => <ModelEditor
    item={item}
    onSave={isNewlyCreated(item) ? this.props.addSponsor : this.props.updateSponsor}
    onCancel={this.clearSelection}
    onRemove={this.removeItem}
    renderFields={(item, handleInputChange, updateStateItem) => {
      return (
        <Columns>
          <Column isSize={{ mobile: 'full', tablet: '2/3', desktop: 'narrow' }}>
            {!isNewlyCreated(item) && <EditorField label='ID'>{item.id}</EditorField>}
            <EditorField label='Nimi'>
              <EditorInput
                field='name'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} />
            </EditorField>
            <EditorField label='Kuvaus'>
              <EditorInput
                field='description'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} />
            </EditorField>
            <EditorField label='Linkki'>
              <EditorInput
                field='link'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} />
            </EditorField>
            <EditorField label='Logo'>
              <EditorInput
                field='logo'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} />
            </EditorField>
            <EditorField label='Aktiivinen alkaen'>
              <DateTimePicker
                selectedDate={item.activeAt}
                onChange={date => updateStateItem({ activeAt: date })}
              /></EditorField>
            <EditorField label='Aktiivinen asti'>
              <DateTimePicker
                selectedDate={item.activeUntil}
                onChange={date => updateStateItem({ activeUntil: date })}
              /></EditorField>
          </Column>
        </Columns>
      )
    }}
  />

  removeItem = item => {
    this.props.removeSponsor(item)
    this.clearSelection()
  }

  render = () => {
    const { sponsors, initNewSponsor, validationErrors } = this.props
    return (
      <BaseContent>
        <Column>
          <Title>Yhteistyökumppanit</Title>
          <Columns>
            <Column isSize='narrow'>
              <SponsorList
                items={sponsors}
                onItemClick={this.handleActiveItemChange}
                originalItems={sponsors}
              />
            </Column>
            <Column isFullWidth>
              <Button isSize='small' isColor='primary' onClick={initNewSponsor}>Lisää uusi</Button>
              <Box>
                <Switch>
                  <Route
                    path={`${rootPath}/:activeItemId`}
                    render={({ match }) => {
                      const { activeItemId } = match.params
                      const activeItem = !isNil(activeItemId) && findSponsorById(sponsors, activeItemId)
                      return activeItem
                        ? this.renderEditor(activeItem, validationErrors)
                        : `Yhteistyökumppania ei löytynyt`
                    }
                    } />
                  <Route render={() => <p>Valitse muokattava kohde listalta</p>} />
                </Switch>
              </Box>
            </Column>
          </Columns>
        </Column>
      </BaseContent >
    )
  }
}

SponsorManager.propTypes = {
  openForEdit: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  validationErrors: PropTypes.shape({ msg: PropTypes.string }),
  clearErrors: PropTypes.func.isRequired,
  sponsors: PropTypes.array.isRequired,
  fetchSponsors: PropTypes.func.isRequired,
  initNewSponsor: PropTypes.func.isRequired,
  addSponsor: PropTypes.func.isRequired,
  updateSponsor: PropTypes.func.isRequired,
  removeSponsor: PropTypes.func.isRequired
}

const SponsorList = ({ items, originalItems, onItemClick }) => items.length > 0 &&
  <VerticalList
    items={items}
    listItemRenderer={item => (
      <ListItem
        key={item.id}
        item={item}
        onItemClick={onItemClick}
      />
    )} />

const ListItem = ({ item, onItemClick }) => {
  const iconClass = moment().isBefore(item.activeUntil)
    ? ''
    : 'fa fa-ban'
  return (
    <li key={item.id} onClick={() => onItemClick(item.id)}>
      <MenuLink className={isNewlyCreated(item) ? 'has-background-info has-text-white-bis' : ''}>
        {item.name} <i className={`${iconClass} has-text-grey-light`} aria-hidden='true' /> <br />
        <small
          className='has-text-grey-light'>
          {moment(item.activeUntil).format('DD.MM.YYYY')}
        </small>
      </MenuLink>
    </li>
  )
}

ListItem.propTypes = {
  item: PropTypes.object,
  onItemClick: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  sponsors: getArraySortedBy(
    state,
    {
      path: 'sponsors',
      sortByKey: 'name',
      orderBy: 'asc'
    }
  ),
  validationErrors: state.sponsors.error,
  closeEditor: () => ownProps.history.push(rootPath),
  openForEdit: activeItemId => ownProps.history.push(`${rootPath}/${activeItemId}`)
})

const mapDispatchToProps = (dispatch) => ({
  clearErrors: () => dispatch(sponsorActions.clearErrors()),
  fetchSponsors: () => dispatch(sponsorActions.fetchSponsors(true)),
  fetchSponsor: sponsorId => dispatch(sponsorActions.fetchSponsor(sponsorId)),
  initNewSponsor: () => dispatch(sponsorActions.prepareNew()),
  addSponsor: item => dispatch(sponsorActions.addSponsor(item)),
  updateSponsor: item => dispatch(sponsorActions.updateSponsor(item)),
  removeSponsor: item => dispatch(sponsorActions.removeSponsor(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(SponsorManager)
