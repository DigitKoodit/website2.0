import React, { Component } from "react";
import FacebookProvider, { EmbeddedPost } from "react-facebook";
import { Tile, Box } from "bloomer";

class SocialMediaView extends Component {
  loadFbFeedApi() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: "225172908136009",
        xfbml: true, // parse social plugins on this page
        version: "v3.1"
      });
      window.FB.api(
        "/digitry/posts",
        'GET',
        {access_token: "EAADMyycz1kkBAAiRtKTBjzSfk6LXSNRO6gyKZA10WEjk0mb6ezC0Ca78dhYBcqnyusQXoSjBjgbzZAHUtkJzY3qZAEBsNZAScN1VpEBZCkkBRZCFRf8pp5TdF1MLXDHTLX7MS2EDN9bjXvOeF20j2ZAVO4YUSumJQN3ZBQo0hFJCCANHlgUZCq6s3dSyfECeI9YYZD"},
        function(response) {
            
        }
      )}
    }

    console.log("Loading fb api");
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  componentDidMount() {
    this.loadFbFeedApi();
  }

  render() {
    return (
      <Tile isParent isSize={12} style={{ padding: 30 }}>
        <Tile isChild render={props => <Box {...props}>{/*  */}</Box>} />
      </Tile>
    );
  }
}

// const SocialMediaView = () => (
//   <Tile isParent isSize={12} style={{ padding: 30 }}>
//     <Tile isChild render={props => <Box {...props}>{/*  */}</Box>} />
//   </Tile>
// );

export default SocialMediaView;
