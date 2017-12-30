import React from 'react';
import PropTypes from 'prop-types';
import { officers, board, representatives } from '../store/localDatabase';
import orderBy from 'lodash/orderBy';
/**
 * Simple snippet which accepts a json 7
 * filled with Digit's officers/board members etc.
 * Currently used only for
 */

const OfficerRenderer = ({ title, baseUrl, dummyImage, officers }) => (
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
        {renderOfficers(orderBy(officers, ['roleId'],['asc']), baseUrl, dummyImage)}
      </tbody>
    </table>
  </div>
)


const renderOfficers = (officers, baseUrl, dummyImage) => {
  const evenValues = officers.filter((officer, index) => index % 2 === 0)
    .map(officer => {
      const image = (officer.image && officer.image.length > 0) ? officer.image : dummyImage;
      console.log(image);
      return { ...officer, image: baseUrl + image };
    });
  const oddValues = officers.filter((officer, index) => index % 2 !== 0)
    .map(officer => {
      const image = (officer.image && officer.image.length > 0) ? officer.image : dummyImage;
      return { ...officer, image: baseUrl + image };
    });

  const rowFirstColumn = evenValues.map(o => renderTableRow(o));
  console.log(rowFirstColumn);
  const rowBothColumns = rowFirstColumn.map((o, index) => oddValues[index] ? rowFirstColumn[index](oddValues[index]) :  rowFirstColumn[index]());
  console.log(rowBothColumns);
  return rowBothColumns;
}

// TODO: add keys
const renderTableRow = officer1 => officer2 => {
  return (
    <tr>
      <td height="130" valign="top">
        <img height="120" src={officer1 && officer1.image} />
      </td>
      <td valign="top">
        <b>
          <a href={officer1 && officer1.url}>{officer1 && officer1.role}</a>
        </b>
        <br />{officer1 && officer1.name}
        <br />{officer1 && officer1.email}
      </td>
      <td>&nbsp;</td>
      <td align="right" valign="top">
        <b>
          <a href={officer2 && officer2.url}>{officer2 && officer2.role}</a>
        </b>
        <br />{officer2 && officer2.name}
        <br />{officer2 && officer2.email}
      </td>
      <td height="130" valign="top">
        <img height="120" src={officer2 && officer2.image} />
      </td>
    </tr>
  )
}

const renderTableItem = (officer, alignLeft) => {
  if (!officer) {
    return;
  }
  if (alignLeft) {
    return (
      <div>
        <td height="130" valign="top">
          <img height="120" src={officer.image} />
        </td>
        <td valign="top">
          <b>
            <a href={officer.url}>{officer.role}</a>
          </b>
          <br />{officer.name}
          <br />{officer.email}
        </td>
      </div>
    )
  }
  return (
    <div>
      <td align="right" valign="top">
        <b>
          <a href={officer.url}>{officer.role}</a>
        </b>
        <br />{officer.name}
        <br />{officer.email}
      </td>
      <td height="130" valign="top">
        <img height="120" src={officer.image} />
      </td>
    </div>
  )
}

OfficerRenderer.defaultProps = {
  title: 'Toimihenkilöt',
  baseUrl: 'http://www.digit.fi/cms/media/',
  dummyImage: 'siluetti.jpg',
  officers: board
}

export default OfficerRenderer;