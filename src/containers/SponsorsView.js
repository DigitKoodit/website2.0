import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ImageLink from '../components/ImageLink'
import { connect } from 'react-redux'
import { sponsorActions } from '../actions'
import { Content, Columns, Column } from 'bloomer'

// const sponsorListDefault = [
//   {
//     name: 'Futurice',
//     link: 'http://futurice.com/',
//     alt: 'sponsor',
//     imageUrl: 'http://static.flockler.com/assets/futurice/images/futurice-logo--green-03a1500828cda47cf3a221faeea0937c5634986c37049f83d3d464dc6c82cec3.svg',
//     weight: 2
//   },
//   {
//     name: 'Wapice',
//     link: 'https://www.wapice.com/fi/?landing=0',
//     alt: 'sponsor',
//     imageUrl: 'http://vaasanseutu.fi/app/uploads/2016/08/Wapice_Logo-1024x254.jpg'
//   },
//   {
//     name: 'Reaktor',
//     link: 'https://www.reaktor.com/',
//     alt: 'sponsor',
//     imageUrl: 'http://www.koodikoulu.fi/static/media/logo-reaktor.png'
//   }
// ]

class SponsorsView extends PureComponent {
  componentDidMount() {
    this.props.fetchSponsors()
  }

  render() {
    const { sponsorList } = this.props
    return (
      <div>
        <Content hasTextAlign='centered'>
          <h2>Yhteistyössä</h2>
        </Content >
        <Columns isCentered>
          {sponsorList && (
            sponsorList.map(sponsor => (
              <Column hasTextAlign='centered'>
                <div
                  key={sponsor.name}
                  className='flex-item sponsor-logo'
                >
                  <ImageLink
                    name={sponsor.name}
                    link={sponsor.link}
                    imageUrl={sponsor.logo}
                    alt={sponsor.name}
                  />
                </div>
              </Column>
            ))
          )}
        </Columns>
        <Content hasTextAlign='centered'>
          <Link className='link margin-1' to='sponsors'>Yhteistyöhon Digitin kanssa?</Link>
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
