import React, { Component } from "react";
import { Tile, Box } from "bloomer";

class SocialMediaView extends Component {
  loadFbFeedApi() {
    // window.fbAsyncInit = function() {
    //   window.FB.init({
    //     appId: "225172908136009",
    //     xfbml: true, // parse social plugins on this page
    //     version: "v3.1"
    //   });
    // };

    console.log("Loading fb api");
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src =
        "https://connect.facebook.net/fi_FI/sdk.js#xfbml=1&version=v3.1&appId=224493054874665&autoLogAppEvents=1";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  componentDidMount() {
    this.loadFbFeedApi();
  }

  render() {
    const fbAddress = "https://www.facebook.com/" + this.props.fbAddress;
    const fbName = this.props.fbName;

    return (
      <Tile isParent isSize={6} style={{ padding: 30 }}>
        <Tile
          isChild
          render={props => (
            <Box {...props}>
              <div
                class="fb-page"
                data-href={fbAddress}
                data-tabs="timeline"
                data-width="500"
                data-small-header="true"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="false"
              >
                <blockquote cite={fbAddress} class="fb-xfbml-parse-ignore">
                  <a href={fbAddress}>{fbName}</a>
                </blockquote>
              </div>
            </Box>
          )}
        />
      </Tile>
    );
  }
}

export default SocialMediaView;
