import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ImageLink from '../components/ImageLink'
import { sponsorActions } from '../actions'
import { Content, Columns, Column, Title } from 'bloomer'

class SponsorsView extends PureComponent {
  componentDidMount() {
    this.props.fetchSponsors()
  }

  render() {
    const { sponsorList } = this.props
    return (
      <div>
        <Content hasTextAlign='centered'>
          <Title>Yhteistyössä</Title>
        </Content >
        <Columns className='ml-5 mr-5' isCentered isMultiline>
          {sponsorList && (
            sponsorList.map(sponsor => (
              <Column
                isSize={{ mobile: '1', default: '1/4' }}
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
          <Link className='link margin-1' to='/partners'>Yhteistyöhon Digitin kanssa?</Link>
        </Content >
      </div>
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
