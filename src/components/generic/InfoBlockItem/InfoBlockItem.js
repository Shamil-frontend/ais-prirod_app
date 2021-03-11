import React from 'react';
import { string, number, element, oneOfType } from 'prop-types';

import './InfoBlockItem.scss';

const InfoBlockItem = ({ title, value }) => (
  <p className="info-block-item">
    <small>{title}:</small>
    {value || '-'}
  </p>
);

InfoBlockItem.defaultProps = {
  value: '-',
};

InfoBlockItem.propTypes = {
  title: string.isRequired,
  value: oneOfType([string, number, element]),
};

export default InfoBlockItem;
