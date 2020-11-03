import React, { PureComponent } from 'react'
import PropTypes from 'prop-types' //
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import { Route, Switch } from 'react-router-dom'
import { Column, Title, Columns, Box, Button, MenuLink } from 'bloomer'
import { VerticalList } from '../../components/Layout/Lists'
import { pageContentActions } from '../../actions'
import { BaseContent } from '../../components/Layout'
import ModelEditor, { EditorField, EditorInput, EditorCheckbox } from '../../components/Intra/ModelEditor'
import MarkdownEditor from '../../components/ContentManagement/MarkdownEditor'

import { getArraySortedBy } from '../../selectors/generalSelectors'
import { findSitePageById } from '../../selectors/siteContentSelectors'
import { INITIAL_ID } from '../../constants'
import { isNewlyCreated, includesNewlyCreated, urlDisplayId } from '../../store/helpers'

const rootPath = '/intra/cms/content'

class ContentManager extends PureComponent {
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
    this.props.openForEdit(urlDisplayId(itemId))
    this.props.clearErrors()
  }

  clearSelection = () => {
    this.props.closeEditor()
    this.props.clearErrors()
  }

  renderEditor = (item, validationErrors) => <ModelEditor
    item={item}
    onSave={isNewlyCreated(item) ? this.props.addPage : this.props.updatePage}
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
            <EditorField label='Piilotettu' tooltipMessage='Ei valittavissa yläpalkkiin. Näkyy kuitenkin jos jo valittu'>
              <EditorCheckbox
                field='isHidden'
                model={item}
                onChange={handleInputChange}
                validationErrors={validationErrors} />
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

  removeItem = item => {
    this.props.removePage(item)
    this.clearSelection()
  }

  render = () => {
    const { pages, initNewPage, validationErrors } = this.props
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
                <Switch>
                  <Route
                    path={`${rootPath}/:activeItemId`}
                    render={({ match }) => {
                      const { activeItemId } = match.params
                      const activeItem = !isNil(activeItemId) && findSitePageById(pages, activeItemId)
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

ContentManager.propTypes = {
  openForEdit: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  validationErrors: PropTypes.shape({ msg: PropTypes.string }),
  pages: PropTypes.array.isRequired,
  fetchPages: PropTypes.func.isRequired,
  initNewPage: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  addPage: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  removePage: PropTypes.func.isRequired
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
      {' '}
      {item.isHidden && (
        <i className='fa fa-eye-slash has-text-grey-light' aria-hidden='true' title='Piilotettu' />)}
    </MenuLink>
  </li>
)

ListItem.propTypes = {
  item: PropTypes.object,
  onItemClick: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  pages: getArraySortedBy(state, {
    path: 'pages',
    sortByKey: 'title',
    sortOrder: 'asc'
  }),
  validationErrors: state.pages.error,
  closeEditor: () => ownProps.history.push(rootPath),
  openForEdit: activeItemId => ownProps.history.push(`${rootPath}/${activeItemId}`)
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
