// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

import './paginator.scss';

const Paginator = ({ totalItemsCount, pageLimit, pageItemsLimit, activePage, setActivePage }) => {

  const [itemPage, setItemPage] = useState(1);
  const [portionNumber, setPortionNumber] = useState(1); //текущая порция кнопок пагинации

  const pagesCount = Math.ceil(totalItemsCount / pageItemsLimit); //количество страниц
  const pageItems = [];   //массив из количества страниц
  for (let i = 1; i <= pagesCount; i++) {
    pageItems.push(i);
  }

  const portionCount = Math.ceil(pagesCount / pageLimit);   //количество порций кнопок пагинаций
  const leftPortionPageNumber = (portionNumber - 1) * pageLimit + 1;  //левая граница порции
  const rightPortionPageNumber = portionNumber * pageLimit;  //правая граница порции

  const currentPage = (param) => {
    setItemPage(param);
    setActivePage(param);
  };

  const prevPortion = (param) => {
    setItemPage((param - 1) * pageLimit);
    setPortionNumber(param - 1);
    setActivePage((param - 1) * pageLimit);
  };

  const nextPortion = (param) => {
    setItemPage(param * pageLimit + 1);
    setPortionNumber(param + 1)
    setActivePage(param * pageLimit + 1);
  };

  useEffect(() => {
    if (activePage === 1) {
      setItemPage(1);
      setPortionNumber(1);
    }
  }, [activePage])

  return (
    <Pagination className="m-0 custom-paginator">
      {portionNumber > 1 ?
        <span className="btn btn-paginator btn-light btn-arrow"
          onClick={() => prevPortion(portionNumber)}>&#x2190;</span> :
        <span className="btn btn-paginator btn-light disabled">&#x2190;</span>}

      {pageItems.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((item) => {
        return <span className={`btn btn-paginator btn-light btn-page${item === itemPage && "btn-light active"}`}
          key={item} onClick={() => currentPage(item)}>{item}</span>
      })}

      {portionCount > portionNumber ?
        <span className="btn btn-paginator btn-light btn-arrow"
          onClick={() => nextPortion(portionNumber)}>&#x2192;</span> :
        <span className="btn btn-paginator btn-light disabled">&#x2192;</span>}
    </Pagination>
  )
}

export default Paginator;
