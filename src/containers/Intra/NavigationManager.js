import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import find from 'lodash/find'
import memoize from 'lodash/memoize'
import { Column, Columns, Title, Box, Button, MenuLink } from 'bloomer'
import { siteNavigationActions, pageContentActions } from '../../actions'
import { BaseContent } from '../../components/Layout'
import { VerticalList } from '../../components/Layout/Lists'
import ModelEditor, { EditorField, EditorInput, EditorCheckbox } from '../../components/Intra/ModelEditor'
import { ChooserModal } from '../../components/Modal'
import { INITIAL_ID } from '../../constants'
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

  handleNavItemClick = itemId => this.setState({ activeItemId: itemId })

  clearSelection = () => this.setState({ activeItemId: null })

  renderEditor = (item, navItems, pages) => <ModelEditor
    item={item}
    onSave={this.state.activeItemId < 0 ? this.props.addNavItem : this.props.updateNavigation}
    onCancel={this.clearSelection}
    onRemove={this.removeNavItem}
    renderFields={(item, handleInputChange, updateStateItem) => {
      const isNewlyCreated = item.id < 0
      return (
        <Columns>
          <Column isSize={{ mobile: 'full', tablet: '2/3', desktop: 'narrow' }}>
            {!isNewlyCreated && <EditorField label='ID'>{item.id}</EditorField>}
            <EditorField label='Nimi'><EditorInput field='title' model={item} onChange={handleInputChange} /></EditorField>
            <EditorField label='Polku' tooltipMessage='Lisää kenoviiva (/) ennen polkua'><EditorInput field='path' model={item} onChange={handleInputChange} /></EditorField>
            <EditorField label='Ylävalikko'>
              <ChooserModal
                ref={this.chooserRef}
                modalTitle='Valitse ylävalikko'
                dataSet={this.filterForNavChooser(item, navItems)}
                selectedItem={find(navItems, { id: item.parentId })}
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
                dataSet={pages}
                selectedItem={find(pages, { id: item.sitePageId })}
                listItemFormatter={item => item.title}
                onSelect={role => {
                  updateStateItem({ sitePageId: role.id })
                  this.chooserRef2.current && this.chooserRef2.current.closeModal()
                }}
                selectedRenderer={item => <p><b>{item.title}</b></p>}
                nullable />
            </EditorField>
            <EditorField label='Julkaistu'><EditorCheckbox field='isVisible' model={item} onChange={handleInputChange} /></EditorField>
            <EditorField label='Paino'><EditorInput type='number' field='weight' model={item} onChange={handleInputChange} /></EditorField>
          </Column>
        </Columns>

      )
    }}
  />

  filterForNavChooser = memoize((activeItem, dataSet) =>
    !activeItem
      ? dataSet
      : dataSet.filter(i => i.id !== activeItem.id && !i.parentId)
  )

  removeNavItem = item => {
    this.props.removeNavItem(item)
    this.clearSelection()
  }

  render() {
    const { navItems, initNewNavItem, pages } = this.props
    const { activeItemId } = this.state
    return (
      <BaseContent>
        <Column>
          <Title>Sivurakenne</Title>
          <Columns>
            <Column isSize='narrow'>
              <NavItemList
                items={navItems.filter(item => !item.parentId)}
                onItemClick={this.handleNavItemClick}
                originalItems={navItems}
              />
            </Column>
            <Column isFullWidth>
              <Button isSize={'small'} isColor='primary' onClick={initNewNavItem}>Lisää uusi</Button>
              <Box>
                {(activeItemId && find(navItems, { id: activeItemId }))
                  ? this.renderEditor(find(navItems, { id: activeItemId }), navItems, pages)
                  : <p>Valitse muokattava kohde listalta</p>}
              </Box>
            </Column>
          </Columns>
        </Column>
      </BaseContent >
    )
  }
}

const NavItemList = ({ items, originalItems, onItemClick }) => items.length > 0 &&
  <VerticalList
    items={items}
    listItemRenderer={item => (
      <ListItem
        key={item.id}
        item={item}
        items={originalItems.filter(subItem => subItem.parentId === item.id)}
        onItemClick={onItemClick}
      />
    )} />

const ListItem = ({ item, items, onItemClick }) => (
  <li key={item.id}>
    <MenuLink className={item.id === INITIAL_ID ? 'has-background-info has-text-white-bis' : ''} onClick={() => onItemClick(item.id)} >
      {item.title}
    </MenuLink>
    {items.length > 0 && (
      <NavItemList
        items={items}
        originalItems={items}
        onItemClick={onItemClick} />
    )}
  </li>
)

ListItem.propTypes = {
  item: PropTypes.object,
  items: PropTypes.array,
  onItemClick: PropTypes.func
}

NavigationManager.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    subItems: PropTypes.array
  })),
  pages: PropTypes.array.isRequired,
  fetchNavigation: PropTypes.func.isRequired,
  addNavItem: PropTypes.func.isRequired,
  initNewNavItem: PropTypes.func.isRequired,
  updateNavigation: PropTypes.func.isRequired,
  removeNavItem: PropTypes.func.isRequired,
  fetchPages: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  navItems: state.siteNavigation.records,
  pages: state.pages.records
})

const mapDispatchToProps = (dispatch) => ({
  fetchNavigation: attemptAuthorizedRoute => dispatch(siteNavigationActions.fetchNavigation(attemptAuthorizedRoute)),
  initNewNavItem: () => dispatch(siteNavigationActions.prepareNew()),
  addNavItem: navItem => dispatch(siteNavigationActions.addNavItem(navItem)),
  updateNavigation: navItem => dispatch(siteNavigationActions.updateNavigation(navItem)),
  removeNavItem: navItem => dispatch(siteNavigationActions.removeNavItem(navItem)),
  fetchPages: () => dispatch(pageContentActions.fetchPages())

})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationManager)
