// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Switch, Route, Redirect, useRouteMatch, NavLink, withRouter } from 'react-router-dom';
// import { Nav } from 'react-bootstrap';

// const IndividualActions = () => {

//   const ACTIONS_LIST = [
//     {
//       label: "Охотничий билет",
//       link: "hunting-ticket",
//       id: 1
//     },
//     {
//       label: "Разрешение",
//       link: "resolution",
//       id: 2
//     },
//     {
//       label: "Нарушение",
//       link: "violation",
//       id: 3
//     },
//     {
//       label: "Оплата",
//       link: "Payment",
//       id: 4
//     },
//     {
//       label: "История изменений",
//       link: "change-history",
//       id: 5
//     }
//   ]
//   const [curentItem, setCurentItem] = React.useState('');
//   const { path, url } = useRouteMatch();

//   return (
//     <>
//       <Nav className="individuals-nav-list" variant="pills" defaultActiveKey={url} justify>
//         {ACTIONS_LIST.map((item) => {
//           const { label, link, id } = item;

//           return (
//             <Nav.Item key={id} className={`${id}`}>
//               <Nav.Link
//                 as={NavLink}
//                 activeClassName="active-tabs"
//                 to={`${url}/${link}`}
//                 onClick={() => setCurentItem(item)}
//               >
//                 {label}
//               </Nav.Link>
//             </Nav.Item>
//           )
//         })}
//       </Nav>

//       <Switch>
//         <Redirect from={`${url}/`} to={`${url}/${curentItem.id}`} exact />
//         <Route path={`${path}/${curentItem.id}`} >
//           <div>asd</div>
//         </Route>
//       </Switch>
//     </>
//   );
// };

// export default IndividualActions;
