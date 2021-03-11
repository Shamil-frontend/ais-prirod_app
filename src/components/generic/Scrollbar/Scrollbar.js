import React from 'react';
import PropTypes from 'prop-types';

import Scrollbars from 'react-custom-scrollbars';

const Scrollbar = ({ maxHeight, children }) => {
  const [isScrollable, setIsScrollable] = React.useState(false);
  const scrollbarRef = React.useRef(null);

  React.useEffect(() => {
    const { getScrollHeight, getClientHeight } = scrollbarRef.current;
    const scrollHeight = getScrollHeight();
    const clientHeight = getClientHeight();

    if (scrollHeight > clientHeight) {
      setIsScrollable(true);
    }
  }, []);

  return (
    <Scrollbars
      ref={scrollbarRef}
      autoHeight
      autoHeightMax={maxHeight}
      renderView={({ style }) => (
        <div
          style={{
            ...style,
            paddingRight: isScrollable ? '15px' : 0,
          }}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};

Scrollbar.defaultProps = {
  maxHeight: 350,
};

Scrollbar.propTypes = {
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node.isRequired,
};

export default Scrollbar;
