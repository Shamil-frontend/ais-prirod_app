import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Col, Table } from 'react-bootstrap';
import convertDate from '../../../utils/convertDate';
import Icon from '../../generic/Icon';
import Tooltip from '../../generic/Tooltip';
import EditHuntingTicket from './EditHuntingTicket/EditHuntingTicket';
import DeleteItemModal from '../../generic/DeleteItemModal';
import CustomPopover from '../../generic/CustomPopover/CustomPopover';
import AddHuntingTicket from './AddHuntingTicket/AddHuntingTicket';
import Paginator from '../../generic/Paginator/paginator';

import { getHuntingLicense, deleteHuntingLicense } from '../../../store/huntingLicense/actions';

import './HuntingIndividual.scss';

const HuntingTicket = ({ individualId }) => {

  const {
    huntingLicenseData: data,
    addedItem,
    editItem,
    deletedItem
  } = useSelector(({ huntingLicense }) => huntingLicense);

  const toggleBtnAdd = data && data.filter(item => item.cancelledDate === null).length;

  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = React.useState('');

  const [page, setPage] = React.useState([]);
  const [activePage, setActivePage] = React.useState(1);

  const pageItemsLimit = 8;
  const pageLimit = 3;
  const visibleArray = data ? data : [];

  const showPage = (itemPage, limit, array) => {
    const startIndex = (itemPage - 1) * limit;
    const endIndex = itemPage * limit;
    setPage(array.slice(startIndex, endIndex));
  };

  // useEffect(() => {
  //   setActivePage(1);
  // }, [data]);

  useEffect(() => {
    showPage(activePage, pageItemsLimit, visibleArray);
  }, [activePage, visibleArray]);

  useEffect(() => {
    if (individualId) {
      dispatch(getHuntingLicense(individualId))
    }
  }, [dispatch, individualId, addedItem, editItem, deletedItem])

  return (
    <>
      <Col className="hunting-content-wrapper">
        <div className="hunting-top-block">
          <div>
            <Table className="custom-table">
              <thead className="thead-block thead-huntingTicet">
                <tr>
                  <th></th>
                  <th>Серия</th>
                  <th>Номер</th>
                  <th>Дата выдачи</th>
                  <th>Дата анулирования</th>
                  <th><AddHuntingTicket customerId={individualId} toggleBtn={toggleBtnAdd} /></th>
                </tr>
              </thead>
              <tbody className="tBody-block">
                {data && page.map((item, idx) => {
                  const dataItem = {
                    "Серия": item?.serialLicense,
                    "Номер": item?.numberLicense,
                    "Дата выдачи": convertDate(item?.issueDate),
                    "Дата в реестре": convertDate(item?.reestrDate),
                    "Уполномоченное лицо": item?.employeesAuthorized,
                    "Кем выдан": item?.issued,
                    "Добавил": item?.employeeFioAdd,
                    "Дата добавления": convertDate(item?.dateAdd),
                    "Изменил": item?.employeeFioModify,
                    "Дата изменения": convertDate(item?.dateModify),
                  }

                  return (
                    <tr key={idx}>
                      <td><span className={`${!item.cancelledDate ? "huntingTicket-active" : "huntingTicket-unactive"}`}></span></td>
                      <td>{item.serialLicense}</td>
                      <td>{item.numberLicense}</td>
                      <td>{convertDate(item.issueDate)}</td>
                      <td>{item.cancelledDate ? convertDate(item.cancelledDate) : "-"}</td>
                      <td>
                        <div>
                          <CustomPopover trigger={["hover", "focus"]} placement="left" data={item && dataItem} />
                          <Tooltip title="Редактировать">
                            <EditHuntingTicket data={item} classs="btn-icon" icon="editPencil" />
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <Button
                              className="btn-icon"
                              onClick={() => setDeleteId(data && item.id)}
                            >
                              <Icon className="danger" name="delete-2" width="16px" height="16px" />
                            </Button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table >
          </div>
        </div>
        <Col className="hunting-bottom-block">
          <Paginator
            className="pagination-block"
            totalItemsCount={visibleArray.length}
            pageLimit={pageLimit}
            pageItemsLimit={pageItemsLimit}
            activePage={activePage}
            setActivePage={(itemPage) => setActivePage(itemPage)}
          />
        </Col>
      </Col>
      <DeleteItemModal
        id={deleteId}
        deleteItem={(itemId) => dispatch(deleteHuntingLicense(itemId))}
        onModalClose={() => setDeleteId('')} />
    </>
  )
}

export default HuntingTicket;
