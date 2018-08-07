import React, { PureComponent } from 'react'
import PropTypes from 'prop-types' //
import { connect } from 'react-redux'
import find from 'lodash/find'
import isNil from 'lodash/isNil'
import { Column, Title, Columns, Box, Input, Checkbox, Button, MenuLink } from 'bloomer'
import { VerticalList } from '../../components/Layout/Lists'
import { pageContentActions } from '../../actions'
import { BaseContent } from '../../components/Layout'
import ModelEditor, { EditorField } from '../../components/Intra/ModelEditor'
import MarkdownEditor from '../../components/ContentManagement/MarkdownEditor'

class ContentManager extends PureComponent {
  state = {
    activeItemId: null
  }
  componentDidMount() {
    this.props.fetchPages()
  }

  handleItemClick = itemId => this.setState({ activeItemId: itemId })

  clearSelection = () => this.setState({ activeItemId: null })

  renderDetailedNavItem = item => <ModelEditor
    item={item}
    onSave={this.state.activeItemId < 0 ? this.props.addPage : this.props.updatePage}
    onCancel={this.clearSelection}
    onRemove={this.removeNavItem}
    renderFields={(item, handleInputChange, updateStateItem) => {
      const isNewlyCreated = item.id < 0
      return (
        <Columns>
          <Column>
            {!isNewlyCreated && <EditorField label='ID'>{item.id}</EditorField>}
            <EditorField label='Nimi'>
              <Input
                isSize='small'
                className='is-inline'
                name='title'
                type='text'
                value={!isNil(item.title) ? item.title : ''}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Kuvaus'>
              <Input
                isSize='small'
                className='is-inline'
                name='description'
                type='text'
                value={!isNil(item.description) ? item.description : ''}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Julkaistu'>
              <Checkbox isSize='small'
                className='is-inline'
                name='active'
                type='checkbox'
                checked={item.isVisible}
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
                onItemClick={this.handleItemClick}
                originalItems={pages}
              />
            </Column>
            <Column isFullWidth>
              <Button isSize='small' isColor='primary' onClick={initNewPage}>Lisää uusi</Button>
              <Box>
                {(activeItemId && find(pages, { id: activeItemId }))
                  ? this.renderDetailedNavItem(find(pages, { id: activeItemId }))
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

const PageList = ({ items, originalItems, onItemClick, level = 0 }) => items.length > 0 &&
  <VerticalList
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

const ListItem = ({ item, onItemClick }) => (
  <li key={item.id} onClick={() => onItemClick(item.id)}>
    <MenuLink>
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
