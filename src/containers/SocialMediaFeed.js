import React, { Component } from 'react'
import { Tile, Box, Media, MediaLeft, Image, Content, Title, MediaContent } from 'bloomer'
import moment from 'moment'
import 'moment/locale/fi'

import fbFeed from './SocialMediaFeed.json'

class SocialMediaFeed extends Component {
  constructor() {
    super()
    this.state = {
      feed: fbFeed
    }
  }

  componentDidMount() {
    // fetch('url')
    //   .then(res => res.json())
    //   .then(parsedRes => {
    //     this.setState({ feed: parsedRes })
    //   })
  }

  render() {
    const posts = this.state.feed.posts.data
    const page = this.state.feed.page.picture.data

    return (
      <Tile isAncestor>
        <Tile isParent isSize={4} style={{ padding: 30 }}>
          <Tile isChild render={
            props => (
              <Box {...props}>
                {posts && (
                  posts.map(post => (
                    <Media>
                      <MediaLeft>
                        <Image src={page.url} />
                      </MediaLeft>
                      <MediaContent>
                        <Content>
                          <p>
                            <strong>Digit ry</strong>
                            <small> {moment().startOf(post.current_time).fromNow()}</small>
                            <div key={post.id}>
                              <Content>
                                <Title isSize={4} >{post.name}</Title>
                                <p>{post.description}</p>
                              </Content>
                              {/* <Box>
                                <Image src={post.picture} />
                              </Box> */}
                            </div>
                          </p>
                        </Content>
                      </MediaContent>
                    </Media>
                  ))
                )}
              </Box>
            )
          } />
        </Tile>
      </Tile>
    )
  }
}

export default SocialMediaFeed
