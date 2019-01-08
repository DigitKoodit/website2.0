import React, { PureComponent } from 'react'
import PropTypes from 'prop-types' //
import { connect } from 'react-redux'
import find from 'lodash/find'
import { Column, Title, Columns, Box, Button, MenuLink } from 'bloomer'
import { VerticalList } from '../../components/Layout/Lists'
import { pageContentActions } from '../../actions'
import { BaseContent } from '../../components/Layout'
import ModelEditor, { EditorField, EditorInput, EditorCheckbox } from '../../components/Intra/ModelEditor'
import MarkdownEditor from '../../components/ContentManagement/MarkdownEditor'

import { isNewlyCreated, includesNewlyCreated } from '../../store/helpers'
import { INITIAL_ID } from '../../constants'
import { getArraySortedBy } from '../../selectors/generalSelectors'

class ContentManager extends PureComponent {
  state = {
    activeItemId: null
  }
  componentDidMount() {
    this.props.fetchPages()
  }

  componentDidUpdate = prevProps => {
    const { pages } = this.props
    if(prevProps.pages.length < pages.length && includesNewlyCreated(pages)) {
      this.handleActiveItemChange(INITIAL_ID)
    }
  }

  handleActiveItemChange = itemId => {
    this.setState({ activeItemId: itemId })
    this.props.clearErrors()
  }

  clearSelection = () => {
    this.setState({ activeItemId: null })
    this.props.clearErrors()
  }

  renderEditor = item => <ModelEditor
    item={item}
    onSave={this.state.activeItemId < 0 ? this.props.addPage : this.props.updatePage}
    onCancel={this.clearSelection}
    onRemove={this.removeNavItem}
    renderFields={(item, handleInputChange, updateStateItem) => {
      return (
        <Columns>
          <Column>
            {!isNewlyCreated(item) &&
              <EditorField label='Id' >
                {item.id}
              </EditorField>}
            <EditorField label='Nimi'>
              <EditorInput
                field='title'
                model={item}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Kuvaus'>
              <EditorInput
                field='description'
                model={item}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Julkaistu'>
              <EditorCheckbox
                field='isVisible'
                model={item}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Luotu'>{parseTime(item.createdAt)}</EditorField>
            <EditorField label='Muokattu'>{parseTime(item.updatedAt)}</EditorField>
            <EditorField label='Sisältö'>
              <MarkdownEditor
                content={item.content}
                handleTextChange={content => updateStateItem({ content: content || '' })}
              />
            </EditorField>
          </Column>
        </Columns>
      )
    }}
  />

  removeNavItem = item => {
    this.props.removePage(item)
    this.clearSelection()
  }

  render = () => {
    const { pages, initNewPage } = this.props
    const { activeItemId } = this.state
    return (
      <BaseContent>
        <Column>
          <Title>Sivut</Title>
          <Columns>
            <Column isSize='narrow'>
              <PageList
                items={pages}
                onItemClick={this.handleActiveItemChange}
                originalItems={pages}
              />
            </Column>
            <Column isFullWidth>
              <Button isSize='small' isColor='primary' onClick={initNewPage}>Lisää uusi</Button>
              <Box>
                {(activeItemId && find(pages, { id: activeItemId }))
                  ? this.renderEditor(find(pages, { id: activeItemId }))
                  : <p>Valitse muokattava kohde listalta</p>}
              </Box>
            </Column>
          </Columns>
        </Column>
      </BaseContent >
    )
  }
}

const parseTime = timeString => timeString && `${new Date(timeString).toLocaleString()}`

const PageList = ({ items, originalItems, onItemClick }) => items.length > 0 &&
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

const ListItem = ({ item, onItemClick }) => (
  <li key={item.id} onClick={() => onItemClick(item.id)}>
    <MenuLink className={isNewlyCreated(item) ? 'has-background-info has-text-white-bis' : ''}>
      {item.title}
    </MenuLink>
  </li>
)

ListItem.propTypes = {
  item: PropTypes.object,
  onItemClick: PropTypes.func
}

ContentManager.propTypes = {
  pages: PropTypes.array.isRequired,
  fetchPages: PropTypes.func.isRequired,
  initNewPage: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  addPage: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  removePage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  pages: getArraySortedBy(state, {
    path: 'pages',
    sortByKey: 'title',
    sortOrder: 'asc'
  })
})

const mapDispatchToProps = (dispatch) => ({
  clearErrors: () => dispatch(pageContentActions.clearErrors()),
  fetchPages: () => dispatch(pageContentActions.fetchPages()),
  fetchPage: pageId => dispatch(pageContentActions.fetchPage(pageId)),
  initNewPage: () => dispatch(pageContentActions.prepareNew()),
  addPage: item => dispatch(pageContentActions.addPage(item)),
  updatePage: item => dispatch(pageContentActions.updatePage(item)),
  removePage: item => dispatch(pageContentActions.removePage(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentManager)
