import React from 'react';
import PropTypes from 'prop-types';
import { profiles, board, representatives } from '../store/localDatabase';
import orderBy from 'lodash/orderBy';

/**
 * Simple snippet which accepts a json 7
 * filled with Digit's profiles/board members etc.
 * Currently used only for
 */
const ProfilesRenderer = ({ title, baseUrl, dummyImage, profiles }) => (
  <div>
    <h1>{title}</h1>
    <p>&nbsp;</p>

    <table border="0">
      <colgroup>
        <col width="70" />
        <col width="180" />
        <col width="5%" />
        <col width="160" />
        <col width="70" />
      </colgroup>
      <tbody>
        {renderProfiles(orderBy(profiles, ['roleId'], ['asc']), baseUrl, dummyImage)}
      </tbody>
    </table>
  </div>
)


const renderProfiles = (profiles, baseUrl, dummyImage) => {
  const evenValues = profiles.filter((Profile, index) => index % 2 === 0)
    .map(Profile => {
      const image = (Profile.image && Profile.image.length > 0) ? Profile.image : dummyImage;
      console.log(image);
      return { ...Profile, image: baseUrl + image };
    });
  const oddValues = profiles.filter((Profile, index) => index % 2 !== 0)
    .map(Profile => {
      const image = (Profile.image && Profile.image.length > 0) ? Profile.image : dummyImage;
      return { ...Profile, image: baseUrl + image };
    });

  const rowFirstColumn = evenValues.map(o => renderTableRow(o));
  console.log(rowFirstColumn);
  const rowBothColumns = rowFirstColumn.map((o, index) => oddValues[index] ? rowFirstColumn[index](oddValues[index]) : rowFirstColumn[index]());
  console.log(rowBothColumns);
  return rowBothColumns;
}

// TODO: add keys
const renderTableRow = Profile1 => Profile2 => {
  return (
    <tr>
      <td height="130" valign="top">
        <img height="120" src={Profile1 && Profile1.image} />
      </td>
      <td valign="top">
        <b>
          <a href={Profile1 && Profile1.url}>{Profile1 && Profile1.role}</a>
        </b>
        <br />{Profile1 && Profile1.name}
        <br />{Profile1 && Profile1.email}
      </td>
      <td>&nbsp;</td>
      <td align="right" valign="top">
        <b>
          <a href={Profile2 && Profile2.url}>{Profile2 && Profile2.role}</a>
        </b>
        <br />{Profile2 && Profile2.name}
        <br />{Profile2 && Profile2.email}
      </td>
      <td height="130" valign="top">
        <img height="120" src={Profile2 && Profile2.image} />
      </td>
    </tr>
  )
}

const renderTableItem = (Profile, alignLeft) => {
  if (!Profile) {
    return;
  }
  if (alignLeft) {
    return (
      <div>
        <td height="130" valign="top">
          <img height="120" src={Profile.image} />
        </td>
        <td valign="top">
          <b>
            <a href={Profile.url}>{Profile.role}</a>
          </b>
          <br />{Profile.name}
          <br />{Profile.email}
        </td>
      </div>
    )
  }
  return (
    <div>
      <td align="right" valign="top">
        <b>
          <a href={Profile.url}>{Profile.role}</a>
        </b>
        <br />{Profile.name}
        <br />{Profile.email}
      </td>
      <td height="130" valign="top">
        <img height="120" src={Profile.image} />
      </td>
    </div>
  )
}

ProfilesRenderer.defaultProps = {
  title: 'Toimihenkilöt',
  baseUrl: 'http://www.digit.fi/cms/media/',
  dummyImage: 'siluetti.jpg',
  profiles: []
}

export default ProfilesRenderer;