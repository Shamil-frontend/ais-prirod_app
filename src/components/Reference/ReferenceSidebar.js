import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Nav, NavItem } from 'react-bootstrap';

import './ReferenceSidebar.scss';

const ReferenceSidebar = () => {

  const NAV_LIST = React.useMemo(
    () => [
      {
        label: 'Охотничье угодье',
        link: '/reference/huntingFarm',
        id: 1,
      },
      {
        label: 'Сезон охоты',
        link: '/reference/season',
        id: 2,
      },
      {
        label: 'Животные',
        link: '/reference/animals',
        id: 3,
      },
      {
        label: 'Нарушения',
        link: '/reference/violations',
        id: 4,
      },
      {
        label: 'Услуги',
        link: '/reference/services',
        id: 5,
      },
      {
        label: 'Сотрудники',
        link: '/reference/employees',
        id: 6,
      },
    ],
    []
  );

  return (
    <>
      <div className="nested-nav-wrapper">
        <Col className="nested-nav-title">
          <h1>Справочники</h1>
        </Col>
        <Col>
          <Nav className="nested-nav-list">
            {NAV_LIST.map(({ label, link, id }) => (
              <NavItem key={id} className="nested-nav-item">
                <NavLink
                  className="nested-nav-link"
                  activeClassName="active-nav"
                  to={link}
                >
                  {label}
                </NavLink>
              </NavItem>
            ))
            }
          </Nav>
        </Col>
      </div>
    </>
  )
};

export default ReferenceSidebar;
