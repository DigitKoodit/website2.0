import React, { PureComponent, Component, Fragment } from 'react'
import PropTypes from 'prop-types' //
import { connect } from 'react-redux'
import find from 'lodash/find'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import { VerticalList } from '../../components/Layout/Lists'
import { pageContentActions } from '../../actions'
import isMatch from 'lodash/isMatch'
import Clickable from '../../components/Event/Clickable'
import { BaseContent } from '../../components/Layout'
import MarkdownEditor from '../../components/ContentManagement/MarkdownEditor'

const renderListItem = item =>
  <Fragment>
    <p className='clear-margin'><span className='text-detail'>NIMI </span>{item.title}</p>
  </Fragment>

const parseTime = timeString => timeString && `${new Date(timeString).toLocaleString()}`

class PageEditor extends Component {
  state = {
    item: this.props.item
  }
  static getDerivedStateFromProps(nextProps, state) {
    // Omitted from: https://medium.com/@ddunderfelt/controlled-forms-with-react-f7ecc1ce6155
    if(nextProps.loading) {
      return null
    }
    // Required for React 16.4: compare prev props to next props
    // and don't update if they're the same. Uses lodash methods.
    const prevProps = get(state, '_prevProps', false)

    if(prevProps && isMatch(nextProps, prevProps)) {
      return null
    }
    const nextState = reduce(
      state,
      (returnState, value, prop) => {
        if(!isNil(nextProps[prop])) {
          return { ...returnState, [prop]: nextProps[prop] }
        }
        return returnState
      },
      state
    )
    // React 16.4: Save the props in state for the next run.
    nextState._prevProps = nextProps

    return nextState
  }

  handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox'
    const value = isCheckbox ? event.target.checked : event.target.value
    const name = event.target.name
    // Default to null TODO: better solution for checking per parameter
    this.setState(prevState => ({ item: { ...prevState.item, [name]: isCheckbox ? value : (value || null) } }))
  }
  handleContentChange = content => this.setState(prevState => ({ item: { ...prevState.item, content: content || '' } }))

  render() {
    const { item } = this.state
    const { onSave, onRemove, onCancel } = this.props
    const isNewlyCreated = item.id < 0
    return <Fragment>
      {!isNewlyCreated && <p><span className='text-detail'>ID </span>{item.id}</p>}
      <p><span className='text-detail'>NIMI </span><input name='title' type='text' value={!isNil(item.title) ? item.title : ''} onChange={this.handleChange} /></p>
      <p><span className='text-detail'>KUVAUS </span><input name='description' type='text' value={!isNil(item.description) ? item.description : ''} onChange={this.handleChange} /></p>
      <p><span className='text-detail'>JULKAISTU </span><input name='published' type='checkbox' checked={item.isVisible} onChange={this.handleChange} /></p>
      <p><span className='text-detail'>LUOTU </span>{parseTime(item.createdAt)}</p>
      <p><span className='text-detail'>MUOKATTU </span>{parseTime(item.updatedAt)}</p>
      <p><span className='text-detail'>SISÄLTÖ </span></p>
      <MarkdownEditor
        content={item.content}
        handleTextChange={this.handleContentChange}
      />
      <button className='margin-top-1' onClick={() => onSave(item)}>Tallenna</button>
      <button className='margin-top-1' onClick={() => onCancel(item)}>Peruuta</button>
      <button className='margin-top-1' onClick={() => onRemove(item)}>Poista</button>
    </Fragment >
  }
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      published: PropTypes.bool.isRequired,
      content: PropTypes.string.isRequired
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  }
}

class ContentManager extends PureComponent {
  state = {
    activeItemId: null
  }
  componentDidMount() {
    this.props.fetchPages()
  }

  handleItemClick = itemId => this.setState({ activeItemId: itemId })

  clearSelection = () => this.setState({ activeItemId: null })

  renderDetailedNavItem = item => <PageEditor
    item={item}
    onSave={this.state.activeItemId < 0 ? this.props.addPage : this.props.updatePage}
    onCancel={this.clearSelection}
    onRemove={this.removeNavItem} />

  removeNavItem = item => {
    this.props.removePage(item)
    this.clearSelection()
  }

  render = () => {
    const { pages, initNewPage } = this.props
    const { activeItemId } = this.state
    return (
      <BaseContent>
        <div className='row'>
          <div className='col-xs-12'>
            <h2>Intra</h2>
            <div className='row margin-top-1'>
              <div className='col-xs-2'>
                <PageList
                  items={pages}
                  onItemClick={this.handleItemClick}
                  originalItems={pages}
                />
                <button className='margin-top-1' onClick={initNewPage}>Lisää uusi</button>
              </div>
              <div className='col-xs-10'>
                <div className='box'>
                  {(activeItemId && find(pages, { id: activeItemId })) ? <Clickable item={find(pages, { id: activeItemId })} renderItem={this.renderDetailedNavItem} /> : <p>Valitse muokattava kohde listalta</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseContent >
    )
  }
}

const PageList = ({ items, originalItems, onItemClick, level = 0 }) => items.length > 0 &&
  <VerticalList
    className={`list`}
    items={items}
    listItemRenderer={item => (
      <ListItem
        key={item.id}
        item={item}
        items={originalItems}
        onItemClick={onItemClick}
        level={level}
      />
    )} />

const ListItem = ({ item, items, level, onItemClick }) => (
  <li key={item.id} className='list-item box' >
    <Clickable className='nav-item' item={item} onClick={() => onItemClick(item.id)} renderItem={renderListItem} />
  </li>
)

ListItem.propTypes = {
  item: PropTypes.object,
  items: PropTypes.array,
  level: PropTypes.number,
  onItemClick: PropTypes.func
}

ContentManager.propTypes = {
  pages: PropTypes.array.isRequired,
  fetchPages: PropTypes.func.isRequired,
  initNewPage: PropTypes.func.isRequired,
  addPage: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  removePage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  pages: state.pages.records
})

const mapDispatchToProps = (dispatch) => ({
  fetchPages: () => dispatch(pageContentActions.fetchPages()),
  fetchPage: pageId => dispatch(pageContentActions.fetchPage(pageId)),
  initNewPage: () => dispatch(pageContentActions.prepareNew()),
  addPage: item => dispatch(pageContentActions.addPage(item)),
  updatePage: item => dispatch(pageContentActions.updatePage(item)),
  removePage: item => dispatch(pageContentActions.removePage(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentManager)
