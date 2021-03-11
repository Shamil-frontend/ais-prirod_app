// Абакаров Шамиль Абдулмуталибович
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Table, Alert } from 'react-bootstrap';
import Icon from '../../generic/Icon';
// import convertDate from '../../../utils/convertDate';
// import Tooltip from '../../generic/Tooltip';
// import EditHuntingTicket from './EditHuntingTicket/EditHuntingTicket';
// import DeleteItemModal from '../../generic/DeleteItemModal';
// import CustomPopover from '../../generic/CustomPopover/CustomPopover';
import AddHuntingPermission from './AddHuntingPermission/AddHuntingPermission';
import Paginator from '../../generic/Paginator/paginator';

import { getHuntingPermission } from '../../../store/huntingPermission/actions';

import './HuntingIndividual.scss';

const HuntingPermission = () => {

  const { huntingLicenseData } = useSelector(({ huntingLicense }) => huntingLicense);

  const {
    huntingPermData: data,
    // addedItem,
    // editItem,
    // deletedItem
  } = useSelector(({ huntingPermission }) => huntingPermission);

  const huntingLicenseId = huntingLicenseData.filter(it => it.cancelledDate === null).length ?
    huntingLicenseData.filter(it => it.cancelledDate === null)[0].id : '';

  const dispatch = useDispatch();
  // const [deleteId, setDeleteId] = React.useState('');
  // const { individualData } = useSelector(({ individuals }) => individuals);

  const [page] = React.useState([]);
  const [activePage, setActivePage] = React.useState(1);

  const pageItemsLimit = 8;
  const pageLimit = 3;
  const visibleArray = data ? data : [];

  // const showPage = (itemPage, limit, array) => {
  //   const startIndex = (itemPage - 1) * limit;
  //   const endIndex = itemPage * limit;
  //   setPage(array.slice(startIndex, endIndex));
  // };

  // useEffect(() => {
  //   setActivePage(1);
  // }, [data]);

  // useEffect(() => {
  //   showPage(activePage, pageItemsLimit, visibleArray);
  // }, [activePage, visibleArray]);

  useEffect(() => {
    dispatch(getHuntingPermission())
  }, [dispatch])

  return (
    <>
      {huntingLicenseId ?
        (<Col className="hunting-content-wrapper">
          <Col className="hunting-top-block">
            <div>
              <Table className="custom-table">
                <thead className="thead-block">
                  <tr>
                    <th>№</th>
                    <th>Бланк</th>
                    <th>Вид охоты</th>
                    <th>Охотугодье</th>
                    <th>Дата выдачи</th>
                    <th>Действия</th>
                    <th><AddHuntingPermission huntingId={huntingLicenseId} toggleBtn={0} /></th>
                  </tr>
                </thead>
                <tbody className="tBody-block">
                  {data && page.map((item, idx) => {
                    // const dataItem = {

                    // }
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          {/* <CustomPopover trigger={["hover", "focus"]} placement="left" data={item && dataItem} />
                          <Tooltip title="Редактировать">
                            <EditHuntingTicket data={item} classs="btn-icon" icon="editPencil" />
                          </Tooltip>
                          <Tooltip title="Корешки">
                            <Icon className="primary" name="catalog" width="16px" height="16px" />
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <Button
                              className="btn-icon"
                              onClick={() => setDeleteId(data && item.id)}
                            >
                              <Icon className="danger" name="delete_3" width="16px" height="16px" />
                            </Button>
                          </Tooltip> */}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table >
            </div>
          </Col>
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
        </Col>) : (
          <div className="alert-conteiner">
            <Alert className="alert-content bkg-warning">
              <p className="m-0 mr-1">
                <Icon className="secondary" name="info" width="16px" height="16px" />
              </p>
              <p className="alert-text">
                Нет разрешений!
            </p>
            </Alert>
          </div>
        )
      }
      {/* <DeleteItemModal
        id={deleteId}
        deleteItem={(itemId) => dispatch(deleteHuntingLicense(itemId))}
        onModalClose={() => setDeleteId('')} /> */}
    </>
  )
}

export default HuntingPermission;
