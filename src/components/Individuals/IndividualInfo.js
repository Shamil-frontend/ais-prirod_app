import React from 'react';
import { Button, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import userPic from '../../images/user.svg';
import Icon from '../generic/Icon';
import Tooltip from '../generic/Tooltip';

import DeleteItemModal from '../generic/DeleteItemModal';
import IndividualInfoModal from './IndividualInfoModal';
import IndividualEdit from './EditIndividual/IndividualEdit';
import HuntingIndividual from './HuntingIndividual/HuntingIndividual';

import convertDate from '../../utils/convertDate';
import { deleteIndividual } from '../../store/individuals/actions';

const IndividualInfo = () => {
  const dispatch = useDispatch();
  const [infoItem, setInfoItem] = React.useState(null);
  const [deleteId, setDeleteId] = React.useState('');
  const { individualData } = useSelector(({ individuals }) => individuals);

  const divRef = React.useRef();

  React.useEffect(() => {
    divRef.current.focus();
  }, [])

  const handleKeyPress = (evt) => {
    if (evt.keyCode === 46) {
      setDeleteId(individualData && individualData.id)
    }
  }

  return (
    <>
      <div className="individual-content" onKeyDown={handleKeyPress} tabIndex="0" ref={divRef}>
        <div className="individual-full-data">
          <div className="d-flex flex-nowrap mb-2">
            <div className="individual-image-wrapper">
              <Image
                className="mb-2"
                src={`${userPic}`}
                width="100"
                height="100"
                alt="Фото сотрудника"
                rounded
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="individual-wrapper-data">
              <div className="d-flex justify-content-between">
                <h1 className="data-cart">{individualData.lastName} {individualData.firstName} {individualData.middleName}</h1>
                <div className="individual-btn-wrapper">
                  <Tooltip title="Полная информация">
                    <Button className="btn-icon" onClick={() => setInfoItem(individualData)}>
                      <Icon className="primary" name="user-more-info" width="24px" height="24px" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Редактировать данные">
                    <IndividualEdit data={individualData} icon="edit" />
                  </Tooltip>
                  <Tooltip title="Удалить">
                    <Button
                      className="btn-icon"
                      onClick={() => setDeleteId(individualData && individualData.id)}
                    >
                      <Icon className="danger" name="delete" width="18px" height="24px" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <Row className="m-0 justify-content-between">

                <div className="data-block">
                  <div className="data-item">
                    <span>Дата рождения:</span>
                    <span className="data-individual">{convertDate(individualData.birthDate)}</span>
                  </div>
                  <div className="data-item">
                    <span>Место рождения:</span>
                    <span className="data-individual">{individualData.birthPlace}</span>
                  </div>
                </div>

                <div className="data-block">
                  <div className="data-item">
                    <span>Проживает по адресу:</span>
                    <span className="data-individual">{individualData.addressLiving}</span>
                  </div>
                  <span className="data-item">
                    <span>{individualData.gender === 1 ? 'Прописан' : 'Прописана'} по адресу:</span>
                    <span className="data-individual">{individualData.identityDocument.addressRegistration}</span>
                  </span>
                </div>

                <div className="data-block">
                  <span className="data-item">
                    <span>Почтовый адресс:</span>
                    <span className="data-individual">{individualData.email}</span>
                  </span>
                  <div className="data-item">
                    <span>Номер телефона:</span>
                    <span className="data-individual">{individualData.phoneNumber1}</span>
                  </div>
                </div>
              </Row>
            </div>
          </div>
          {/* <Col>
            <div className="block-dop-info">
              <div className="">
                <span className="span-text-bold">добавил:</span>
                <span>{individualData.employeeFioAdd}</span>
              </div>
              <div >
                <span className="span-text-bold">дата добавления:</span>
                <span>{convertDate(individualData.dateAdd)}</span>
              </div>
            </div>
          </Col> */}
        </div>

        <div className="individual-actions">
          <HuntingIndividual />
        </div>
      </div>

      {infoItem && (
        <IndividualInfoModal item={infoItem} onModalClose={() => setInfoItem(null)} />
      )}
      <DeleteItemModal
        id={deleteId}
        deleteItem={(itemId) => dispatch(deleteIndividual(itemId))}
        onModalClose={() => setDeleteId('')} />
    </>
  );
};

export default IndividualInfo;
