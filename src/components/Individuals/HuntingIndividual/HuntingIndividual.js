import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch, NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import HuntingTicket from './HuntingTicket';
import HuntingPermission from './HuntingPermission';

import './HuntingIndividual.scss';

const HuntingIndividual = () => {

  const NAV_LIST = [
    {
      name: "Охотничий билет",
      id: 1,
    },
    {
      name: "Разрешение",
      id: 2,
    },
    {
      name: "Нарушение",
      id: 3,
    },
    {
      name: "Оплата",
      id: 4,
    },
    {
      name: "История изменений",
      id: 5,
    },
  ];

  const { path, url } = useRouteMatch();

  const { individualData } = useSelector(({ individuals }) => individuals);

  return (
    <>
      <div className="d-flex flex-column w-100">
        <div className="huntingTicket-container">
          <div className="huntingTicket-nav">
            <Nav className="huntingTicket-nav-list" defaultActiveKey={url} justify>
              {NAV_LIST.map(({ id, name }) => (
                <Nav.Item key={id} className="huntingTicket-nav-item">
                  <Nav.Link
                    as={NavLink}
                    activeClassName="active-tabs"
                    to={`${url}/${individualData.firstName}/${name.toLowerCase()}`}
                  // onClick={() => onItemClick(individualData.id, id)}
                  >
                    {name}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </div>
        <Switch>
          <Redirect from={`${url}/${individualData.firstName}`} to={`${url}/${individualData.firstName}/охотничий билет`} exact />
          <Route path={`${path}/${individualData.firstName}/охотничий билет`} exact>
            <HuntingTicket individualId={individualData && individualData.id} />
          </Route>
          <Route path={`${path}/${individualData.firstName}/разрешение`} exact>
            <HuntingPermission />
          </Route>

        </Switch>
      </div>
    </>
  )
}

export default HuntingIndividual;
