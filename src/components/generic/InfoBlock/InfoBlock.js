import React from 'react';
import { string, element, arrayOf, oneOfType } from 'prop-types';

import './InfoBlock.scss';

const InfoBlock = ({ title, children }) => (
  <div className="info-block">
    {title && <h4 className="info-block-title">{title}</h4>}
    <div className="info-block-content">{children}</div>
  </div>
);

InfoBlock.defaultProps = {
  title: undefined,
};

InfoBlock.propTypes = {
  title: oneOfType([string, element]),
  children: oneOfType([arrayOf(element), element]).isRequired,
};

export default InfoBlock;
