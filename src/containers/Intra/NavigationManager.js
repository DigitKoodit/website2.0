import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import { Route, Switch } from 'react-router-dom'
import { Column, Columns, Title, Box, Button, MenuLink } from 'bloomer'
import { siteNavigationActions, pageContentActions } from '../../actions'
import { BaseContent } from '../../components/Layout'
import { VerticalList } from '../../components/Layout/Lists'
import ModelEditor, { EditorField, EditorInput, EditorCheckbox } from '../../components/Intra/ModelEditor'
import { ChooserModal } from '../../components/Modal'
import { getArrayOrderedBy } from '../../selectors/generalSelectors'
import { findNavItemById, getNavItemsForChooser } from '../../selectors/navItemSelectors'
import { findSitePageById } from '../../selectors/siteContentSelectors'
import { INITIAL_ID } from '../../constants'
import { isNewlyCreated, includesNewlyCreated, urlDisplayId } from '../../store/helpers'
import { findPublicPages } from '../../selectors/pageSelectors'

const rootPath = '/intra/cms/navigation'

class NavigationManager extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeItemId: null
    }
    this.chooserRef = React.createRef()
    this.chooserRef2 = React.createRef()
  }

  componentDidMount() {
    this.props.fetchNavigation(true)
    this.props.fetchPages()
  }

  componentDidUpdate = prevProps => {
    const { navItems } = this.props
    if(prevProps.navItems.length < navItems.length && includesNewlyCreated(navItems)) {
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
    onSave={isNewlyCreated(item) ? this.props.addNavItem : this.props.updateNavItem}
    onCancel={this.clearSelection}
    onRemove={this.removeNavItem}
    renderFields={(item, handleInputChange, updateStateItem) => {
      return (
        <Columns>
          <Column isSize={{ mobile: 'full', tablet: '2/3', desktop: 'narrow' }}>
            {!isNewlyCreated(item) && <EditorField label='ID'>{item.id}</EditorField>}
            <EditorField label='Nimi'>
              <EditorInput
                field='title'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} />
            </EditorField>
            <EditorField label='Polku'>
              <EditorInput
                field='path'
                model={item}
                onChange={handleInputChange}

                validationErrors={validationErrors} />
            </EditorField>
            <EditorField label='Polku ulkopuoliselle sivulle'>
              <EditorCheckbox
                field='isRedirect'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} />
            </EditorField>
            {item.isRedirect && (
              <EditorField label='Ulkoinen polku'>
                <EditorInput
                  field='externalPath'
                  model={item}
                  onChange={handleInputChange}
                  validationErrors={validationErrors}
                />
              </EditorField>
            )}
            <EditorField label='Ylävalikko'>
              <ChooserModal
                ref={this.chooserRef}
                modalTitle='Valitse ylävalikko'
                dataSet={this.props.getNavItemsForChooser(item.id)}
                selectedItem={this.props.findNavItemById(item.parentId)}
                listItemFormatter={item => item.title}
                onSelect={navItem => {
                  updateStateItem({ parentId: navItem ? navItem.id : null })
                  this.chooserRef.current && this.chooserRef.current.closeModal()
                }}
                selectedRenderer={item => <p><b>{item.title}</b></p>}
                nullable />
            </EditorField>
            <EditorField label='Sisältö'>
              <ChooserModal
                ref={this.chooserRef2}
                modalTitle='Valitse sisältösivu'
                dataSet={this.props.pages}
                selectedItem={this.props.findPageById(item.sitePageId)}
                listItemFormatter={item => item.title}
                onSelect={page => {
                  updateStateItem({ sitePageId: page.id })
                  this.chooserRef2.current && this.chooserRef2.current.closeModal()
                }}
                selectedRenderer={page => <p><b>{page.title}</b></p>}
                nullable />
            </EditorField>
            <EditorField label='Näytetään valikossa'>
              <EditorCheckbox
                field='showOnNavigation'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} />
            </EditorField>
            <EditorField
              label='Julkinen'><EditorCheckbox
                field='isPublished'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} /></EditorField>
            <EditorField
              label='Paino'><EditorInput
                type='number'
                field='weight'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} /></EditorField>
            <EditorField label='Korosta valikossa'>
              <EditorCheckbox
                field='isEmphasized'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} />
            </EditorField>
          </Column>
        </Columns>

      )
    }}
  />

  removeNavItem = item => {
    this.props.removeNavItem(item)
    this.clearSelection()
  }

  render() {
    const { navItems, initNewNavItem, validationErrors } = this.props
    return (
      <BaseContent>
        <Column>
          <Title>Sivurakenne</Title>
          <Columns>
            <Column isSize='narrow'>
              <NavItemList
                items={navItems.filter(item => !item.parentId)}
                onItemClick={this.handleActiveItemChange}
                originalItems={navItems}
              />
            </Column>
            <Column isFullWidth>
              <Button isSize={'small'} isColor='primary' onClick={initNewNavItem}>Lisää uusi</Button>
              <Box>
                <Switch>
                  <Route
                    path={`${rootPath}/:activeItemId`}
                    render={({ match }) => {
                      const { activeItemId } = match.params
                      const activeItem = !isNil(activeItemId) && findNavItemById(navItems, activeItemId)
                      return activeItem
                        ? this.renderEditor(activeItem, validationErrors)
                        : `Sivua ei löytynyt`
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

NavigationManager.propTypes = {
  openForEdit: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  validationErrors: PropTypes.shape({ msg: PropTypes.string }),
  clearErrors: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    subItems: PropTypes.array
  })),
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })),
  fetchNavigation: PropTypes.func.isRequired,
  addNavItem: PropTypes.func.isRequired,
  initNewNavItem: PropTypes.func.isRequired,
  updateNavItem: PropTypes.func.isRequired,
  removeNavItem: PropTypes.func.isRequired,
  fetchPages: PropTypes.func.isRequired,
  findNavItemById: PropTypes.func.isRequired,
  findPageById: PropTypes.func.isRequired,
  getNavItemsForChooser: PropTypes.func.isRequired
}

const NavItemList = ({ items, originalItems, onItemClick }) => items.length > 0 &&
  <VerticalList
    items={items}
    listItemRenderer={item => (
      <ListItem
        key={item.id}
        item={item}
        items={originalItems}
        onItemClick={onItemClick}
      />
    )} />

const ListItem = ({ item, items, onItemClick }) => {
  const iconClass = item.isPublished
    ? item.showOnNavigation
      ? ''
      : 'fa fa-eye-slash'
    : 'fa fa-ban'
  const subItems = items.filter(subItem => subItem.parentId === item.id)
  return (
    <li key={item.id}>
      <MenuLink className={isNewlyCreated(item) ? 'has-background-info has-text-white-bis' : ''} onClick={() => onItemClick(item.id)} >
        {item.title} <i className={`${iconClass} has-text-grey-light`} aria-hidden='true' />
      </MenuLink>
      {items.length > 0 && (
        <NavItemList
          items={subItems}
          originalItems={items}
          onItemClick={onItemClick} />
      )}
    </li>
  )
}

ListItem.propTypes = {
  item: PropTypes.object,
  items: PropTypes.array,
  onItemClick: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  navItems: getArrayOrderedBy(state, {
    path: 'siteNavigation',
    sortByKeys: ['isPublished', 'showOnNavigation', 'title'],
    orders: ['desc', 'desc', 'asc']
  }),
  pages: findPublicPages(state),
  validationErrors: state.siteNavigation.error,
  closeEditor: () => ownProps.history.push(rootPath),
  openForEdit: activeItemId => ownProps.history.push(`${rootPath}/${activeItemId}`),
  findNavItemById: id => findNavItemById(state, id),
  getNavItemsForChooser: id => getNavItemsForChooser(state, id),
  findPageById: pageId => findSitePageById(state, pageId)
})

const mapDispatchToProps = (dispatch) => ({
  clearErrors: () => dispatch(siteNavigationActions.clearErrors()),
  fetchNavigation: attemptAuthorizedRoute => dispatch(siteNavigationActions.fetchNavigation(attemptAuthorizedRoute)),
  initNewNavItem: () => dispatch(siteNavigationActions.prepareNew()),
  addNavItem: navItem => dispatch(siteNavigationActions.addNavItem(navItem)),
  updateNavItem: navItem => dispatch(siteNavigationActions.updateNavItem(navItem)),
  removeNavItem: navItem => dispatch(siteNavigationActions.removeNavItem(navItem)),
  fetchPages: () => dispatch(pageContentActions.fetchPages())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationManager)
