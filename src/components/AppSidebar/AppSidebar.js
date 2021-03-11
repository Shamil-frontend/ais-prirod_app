import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '../generic/Icon';

import './AppSidebar.scss';

const NAV_ITEMS = [
  {
    label: 'Главная',
    icon: 'home',
    link: '/home',
  },
  {
    label: 'Карта',
    icon: 'map-2',
    link: '/map',
  },
  {
    label: 'Кадендарь',
    icon: 'calendar',
    link: '/calendar',
  },
  {
    label: 'Новое обрашение',
    icon: 'file-2',
    link: '/newAppel',
  },
  {
    label: 'Архив обращений',
    icon: 'archive',
    link: '/appeal',
  },
  {
    label: 'Физические лица',
    icon: 'employees',
    link: '/individuals',
  },
  {
    label: 'Нарушения',
    icon: 'violation',
    link: '/violations',
  },
  {
    label: 'Справочники',
    icon: 'reference',
    link: '/reference',
  },
];

const AppSidebar = () => (
  <aside className="app-sidebar">
    <nav>
      <ul className="list-unstyled">
        {NAV_ITEMS.map(({ label, icon, link }) => (
          <li key={link}>
            <NavLink className="nav-item" to={link}>
              <Icon name={icon} />
              <span style={{ width: '95px', textAlign: 'center', fontSize: "12px" }}>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default AppSidebar;
