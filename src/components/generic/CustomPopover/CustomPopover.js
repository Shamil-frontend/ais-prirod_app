import React from 'react';
import PropTypes from 'prop-types';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Button } from 'react-bootstrap';
import Icon from '../Icon';

const CustomPopover = ({ trigger, placement, data }) => {
  const infoData = Object.entries(data);
  return (
    <OverlayTrigger
      trigger={trigger}
      placement={placement}
      overlay={
        <Popover id="popover-basic">
          <Popover.Title>Информация</Popover.Title>
          <Popover.Content>
            <div className="text-left" style={{ fontSize: "12px" }}>
              {infoData.map((item, idx) => {
                const [key, value] = item;
                return (
                  <div key={idx} className={`${key === 'Добавил' ? 'mt-2' : null} ${key === 'Кем выдан' ? 'mb-2' : null}`}>
                    <b>{key}: </b>
                    <span>{value}</span>
                  </div>
                )
              })}
            </div>
          </Popover.Content>
        </Popover>
      }
    >
      <Button variant="icon" style={{ cursor: "default" }} >
        <Icon name="info" className="primary" width="16px" height="16px" />
      </Button>
    </OverlayTrigger>

  )
};

CustomPopover.defaultProps = {
  trigger: 'hover',
  placement: 'auto',
  data: {}
};

CustomPopover.propTypes = {
  trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  data: PropTypes.object.isRequired,
  placement: PropTypes.string
};

export default CustomPopover;
