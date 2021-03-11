import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import ChangePasswordModal from '../generic/ChangePasswordModal';

import { logoutUser } from '../../store/user/actions';

const HeaderUser = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => dispatch(logoutUser(history));
  const onPassChangeClick = () => setIsModalOpen(true);

  const { userData } = useSelector(({ user }) => user);
  const employee = userData ? `${userData.data.lastName} ${userData.data.firstName}` : '';

  return userData ? (
    <>
      <NavDropdown title={employee} id="basic-nav-dropdown" alignRight>
        <NavDropdown.Item as={Link} to="/lk">
          Мой профиль
        </NavDropdown.Item>
        <NavDropdown.Item onClick={onPassChangeClick}>Сменить пароль</NavDropdown.Item>
        <NavDropdown.Item onClick={onLogout}>Выйти</NavDropdown.Item>
      </NavDropdown>
      <ChangePasswordModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </>
  ) : (
      <Nav.Link as={NavLink} to="/lk">
        Личный кабинет
      </Nav.Link>
    );
};

export default HeaderUser;
