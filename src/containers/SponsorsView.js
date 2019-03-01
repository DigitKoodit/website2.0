import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ImageLink from '../components/ImageLink'
import { sponsorActions } from '../actions'
import { Content, Columns, Column, Title, Tile, Box } from 'bloomer'

class SponsorsView extends PureComponent {
  componentDidMount() {
    this.props.fetchSponsors()
  }

  render() {
    const { sponsorList } = this.props
    return (
      <Tile isParent className='frontpage-responsive-tile'>
        <Tile isChild render={
          props => (
            <Box {...props}>
              <Title className='highlight-left-dark-red' >Yhteistyössä</Title>
              <Columns isCentered isMultiline>
                {sponsorList && (
                  sponsorList.map(sponsor => (
                    <Column
                      isSize={{ mobile: '1', default: '1/3' }}
                      key={sponsor.name}
                      hasTextAlign='centered'>
                      <ImageLink
                        name={sponsor.name}
                        link={sponsor.link}
                        imageUrl={sponsor.logo}
                        alt={sponsor.name}
                      />
                    </Column>
                  ))
                )}
              </Columns>
              <Content hasTextAlign='centered'>
                <Link className='link margin-1' to='/yrityksille'>
                  Yhteistyöhon Digitin kanssa?
                </Link>
              </Content >
            </Box>
          )
        } />
      </Tile>
    )
  }
}

SponsorsView.propTypes = {
  sponsorList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    weight: PropTypes.number
  })),
  fetchSponsors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  // TODO: filter unactive sponsors
  sponsorList: state.sponsors.records
})

const mapDispatchToProps = dispatch => ({
  fetchSponsors: () => dispatch(sponsorActions.fetchSponsors())
})

export default connect(mapStateToProps, mapDispatchToProps)(SponsorsView)
