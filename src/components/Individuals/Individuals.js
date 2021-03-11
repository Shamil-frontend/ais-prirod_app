import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch, NavLink } from 'react-router-dom';
import { Alert, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';

import { getSearchIndividuals, getIndividualData } from '../../store/individuals/actions';

import IndividualInfo from './IndividualInfo';
import IndividualAdd from './AddIndividual/IndividualAdd';
import Icon from '../generic/Icon';
import SearchBar from '../SearchBar';

import './Individuals.scss';

const Individuals = ({ history }) => {
  const dispatch = useDispatch();
  const [visibleInfo, setVisibleInfo] = React.useState(false);
  const [ItemId, setItemId] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');

  const {
    individualsList,
    loading,
    error,
    individualData,
    loadingData,
    addedItem,
    editItem,
    addSearchText,
    deleting
  } = useSelector(({ individuals }) => individuals);
  const { path, url } = useRouteMatch();

  const onSubmit = (searchText) => {
    setSearchValue(searchText)
    dispatch(getSearchIndividuals(searchText))
  }

  const onNavItemClick = (id) => {
    setItemId(id);
    setVisibleInfo(true);
    dispatch(getIndividualData(id))
  }

  useEffect(() => {
    history.push('/individuals')
  }, [history])

  useEffect(() => {
    if (editItem) {
      setItemId(editItem.id);
      setVisibleInfo(true);
      dispatch(getIndividualData(editItem.id));
    } else if (addedItem) {
      setItemId(addedItem);
      setVisibleInfo(true);
      dispatch(getIndividualData(addedItem));
    }
  }, [dispatch, editItem, addedItem])

  useEffect(() => {
    if (!deleting) {
      dispatch(getSearchIndividuals(searchValue));
      setVisibleInfo(false);
      history.push('/individuals')
    }
  }, [dispatch, deleting, searchValue, history])

  return (
    <>
      <div className="search-block">
        <SearchBar classs="individual-search" searchValue={addSearchText} onSubmit={(value) => onSubmit(value)} placeholder="Поиск..." />
      </div>
      <div className="individuals-wrapper">
        <div className="individuals-nav-container">
          <div className="individuals-nav-block ">
            <div className="nav-header">
              <span className="num-entries">записей найдено: {searchValue ? individualsList && individualsList.length : 0}</span>
              <IndividualAdd />
            </div>
            <div className="individuals-nav-list-wrapper custom-scroll">
              {loading && <LoadingIndicator />}
              {error && <ErrorIndicator error={error} />}
              {!error && !loading && individualsList && (addSearchText.length || searchValue.length) ? (
                individualsList.length ? (
                  <Nav className="individuals-nav-list" variant="pills" defaultActiveKey={url} justify>
                    {individualsList.map((item) => {
                      const {
                        id,
                        lastName,
                        firstName,
                        middleName,
                        addressLiving,
                        phone } = item;
                      return (
                        <Nav.Item key={id} className={`individuals-nav-item `}>
                          <Nav.Link
                            as={NavLink}
                            activeClassName={` ${id === ItemId ? "active-link" : null}`}
                            to={`${url}/${firstName}`}
                            onClick={() => onNavItemClick(id)}
                          >
                            <div className="individual-info">
                              <span className="individual-fio">{lastName} {firstName} {middleName}</span>

                              <div className="individual-dop-info">
                                <span>
                                  <Icon className="secondary mb-1 mr-1" name="location" width="12px" height="13px" />
                                  {addressLiving}
                                </span>
                                <span>
                                  <Icon className="secondary mb-1 mr-1" name="phone" width="12px" height="13px" />
                                  {phone}
                                </span>
                              </div>
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                      )
                    })}
                  </Nav>
                ) : (
                    <Alert className="search-nothing" variant="secondary">
                      <span className="search-nothing-text">
                        "{searchValue}"
                    </span>
                      <span style={{ textAlign: 'center' }}>По запросу ничего не найдено</span>
                    </Alert>
                  )
              ) : (
                  <div>
                    {/* <Alert className="alert-content" variant="secondary">
                      <span >
                        <Icon className="primary" name="alertSearch" width="22px" height="22px" />
                      </span>

                      <p className="m-3">
                        Воспользуйтесь поиском
                  </p>
                    </Alert> */}
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="individual-content-wrapper">
          {!visibleInfo || loadingData ? (
            <div className="alert-conteiner">
              <Alert className="alert-content bck-secondary">
                <p className="m-0 mr-1">
                  <Icon className="secondary" name="info" width="16px" height="16px" />
                </p>
                <p className="alert-text">
                  Выберите физическое лицо для отображеия иинформации о нем!
                </p>
              </Alert>
            </div>
          ) : (
              <Switch>
                <Redirect from={`${url}/`} to={`${url}/${individualData?.firstName}`} exact />
                <Route path={`${path}`} >
                  <IndividualInfo />
                </Route>
              </Switch>
            )
          }
        </div>
      </div>
    </>
  );
};

export default withRouter(Individuals);
