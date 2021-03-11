import React from 'react';
import { Switch, Route, Redirect, useRouteMatch, NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import HuntingFarm from './HuntingFarm';
import HuntingFarmType from './HuntingFarmType';

import './HuntingFarm.scss';

const HuntingFarmSidebar = () => {

  const NAV_LIST = [
    {
      name: "Охотничьи угодья",
      id: 1,
    },
    {
      name: "Виды охотугодья",
      id: 2,
    }
  ];
  const { path, url } = useRouteMatch();

  return (
    <>
      <div className="huntingFarmSidebar-wrapper">

        <div className="huntingFarm-nav">
          <Nav className="huntingFarm-nav-list" defaultActiveKey={url} justify>
            {NAV_LIST.map(({ id, name }) => (
              <Nav.Item key={id} className="huntingFarm-nav-item">
                <Nav.Link
                  as={NavLink}
                  activeClassName="active-tabs"
                  to={`${url}/${name.toLowerCase()}`}
                >
                  {name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        <Switch>
          <Redirect from={`${url}`} to={`${url}/охотничьи угодья`} exact />
          <Route path={`${path}/охотничьи угодья`} exact>
            <HuntingFarm />
          </Route>
          <Route path={`${path}/виды охотугодья`} exact>
            <HuntingFarmType />
          </Route>

        </Switch>

      </div>
    </>
  )
}

export default HuntingFarmSidebar;
