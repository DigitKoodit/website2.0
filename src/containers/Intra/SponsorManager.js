import React, { Component } from 'react'
import PropTypes from 'prop-types' //
import { connect } from 'react-redux'
import find from 'lodash/find'
import moment from 'moment'
import { Column, Title, Columns, Box, Button, MenuLink } from 'bloomer'
import DatePicker from 'react-datepicker'
import { sponsorActions } from '../../actions'
import { BaseContent, VerticalList } from '../../components/Layout'
import ModelEditor, { EditorField, EditorInput } from '../../components/Intra/ModelEditor'
import '../../styles/datepicker.scss'
import { getArraySortedBy } from '../../selectors/generalSelectors'
import { isNewlyCreated } from '../../store/helpers'

class SponsorManager extends Component {
  state = {
    activeItemId: null
  }
  componentDidMount() {
    this.props.fetchSponsors()
  }

  handleItemClick = itemId => this.setState({ activeItemId: itemId })

  clearSelection = () => this.setState({ activeItemId: null })

  renderEditor = item => <ModelEditor
    item={item}
    onSave={this.state.activeItemId < 0 ? this.props.addSponsor : this.props.updateSponsor}
    onCancel={this.clearSelection}
    onRemove={this.removeNavItem}
    renderFields={(item, handleInputChange, updateStateItem) => {
      const isNewlyCreated = item.id < 0
      return (
        <Columns>
          <Column isSize={{ mobile: 'full', tablet: '2/3', desktop: 'narrow' }}>
            {!isNewlyCreated && <EditorField label='ID'>{item.id}</EditorField>}
            <EditorField label='Nimi'>
              <EditorInput
                field='name'
                model={item}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Kuvaus'>
              <EditorInput
                field='description'
                model={item}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Linkki'>
              <EditorInput
                field='link'
                model={item}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Logo'>
              <EditorInput
                field='logo'
                model={item}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Aktiivinen alkaen'>
              <DatePicker
                selected={moment(item.activeAt)}
                onChange={date => updateStateItem({ activeAt: date })}
              /></EditorField>
            <EditorField label='Aktiivinen asti'>
              <DatePicker
                selected={moment(item.activeUntil)}
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
    const { sponsors, initNewSponsor } = this.props
    const { activeItemId } = this.state
    return (
      <BaseContent>
        <Column>
          <Title>Yhteistyökumppanit</Title>
          <Columns>
            <Column isSize='narrow'>
              <SponsorList
                items={sponsors}
                onItemClick={this.handleItemClick}
                originalItems={sponsors}
              />
            </Column>
            <Column isFullWidth>
              <Button isSize='small' isColor='primary' onClick={initNewSponsor}>Lisää uusi</Button>
              <Box>
                {(activeItemId && find(sponsors, { id: activeItemId }))
                  ? this.renderEditor(find(sponsors, { id: activeItemId }))
                  : <p>Valitse muokattava kohde listalta</p>}
              </Box>
            </Column>
          </Columns>
        </Column>
      </BaseContent >
    )
  }
}

SponsorManager.propTypes = {
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

const mapStateToProps = (state) => ({
  sponsors: getArraySortedBy(
    state,
    {
      path: 'sponsors',
      sortByKey: 'name',
      orderBy: 'asc'
    }
  )
})

const mapDispatchToProps = (dispatch) => ({
  fetchSponsors: () => dispatch(sponsorActions.fetchSponsors(true)),
  fetchSponsor: sponsorId => dispatch(sponsorActions.fetchSponsor(sponsorId)),
  initNewSponsor: () => dispatch(sponsorActions.prepareNew()),
  addSponsor: item => dispatch(sponsorActions.addSponsor(item)),
  updateSponsor: item => dispatch(sponsorActions.updateSponsor(item)),
  removeSponsor: item => dispatch(sponsorActions.removeSponsor(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(SponsorManager)
