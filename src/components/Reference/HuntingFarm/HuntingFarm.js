import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, FormGroup, Form, FormLabel, Button } from 'react-bootstrap';

// import EditRoles from './EditRoles/EditRoles';
// import DeleteBtn from '../generic/DeleteBtn';
import AddHuntingFarm from './AddHuntingFarm/AddHuntingFarm';
import EditHuntingFarm from './EditHuntingFarm/EditHuntingFarm';
import DeleteItemModal from '../../generic/DeleteItemModal';
// import SearchBar from '../../SearchBar';
import CustomPopover from '../../generic/CustomPopover';
import Tooltip from '../../generic/Tooltip';
import convertDate from '../../../utils/convertDate';

import { getHuntingFarm, deleteHuntingFarm, editHuntingFarm } from '../../../store/huntingFarm/actions';
import { getHuntingFarmType } from '../../../store/huntingFarmType/actions';

import './HuntingFarm.scss';
import Icon from '../../generic/Icon';

const HuntingFarm = () => {

  const dispatch = useDispatch();
  const { huntingFarmData } = useSelector(({ huntingFarm }) => huntingFarm);
  const { huntingFarmTypeData } = useSelector(({ huntingFarmType }) => huntingFarmType);
  // const [curentItem, setCurentItem] = useState('');
  // const [closeEditModal, setCloseEditModal] = useState(true);
  // const [closeDeleteModal, setCloseDeleteModal] = useState(true);
  // const [filteredRoles, setFilteredRoles] = useState([]);

  const [data, setData] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState('');
  // const onSearchChange = (search, data) => {
  //   if (!search) {
  //     return true;
  //   } else {
  //     const result = data.filter(({ nameRus }) => nameRus.toLowerCase().includes(search.toLowerCase()));
  //     setFilteredRoles(result);
  //   }
  // };

  // const visibleData = value ? filteredRoles : [rolesList];

  // const deleteItem = (onError, itemId) => dispatch(deleteRoles(itemId));

  const onOptionClick = (evt) => {
    if (evt === 'Все') {
      setData(huntingFarmData)
    } else if (evt !== 'Все') {
      setData(huntingFarmData.filter(it => it.typeName.toLowerCase() === evt.toLowerCase()))
    }
  }

  useEffect(() => {
    dispatch(getHuntingFarm());
    dispatch(getHuntingFarmType());
  }, [dispatch]);

  useEffect(() => {
    onOptionClick('Все', huntingFarmData)
  }, [huntingFarmData]);

  return (
    <>
      <div className="huntingFarm-wrapper">
        <div className="huntingFarm-top-block">
          <div className="huntingFarm-select-wrapper">
            <FormGroup className="huntingFarm-select">
              <FormLabel>Тип охотугодья</FormLabel>
              <Form.Control
                className="custom-select"
                as="select"
                onChange={(evt) => onOptionClick(evt.target.options[evt.target.selectedIndex].text)}
                size="sm" custom>
                <option value="1">Все</option>
                {huntingFarmTypeData && huntingFarmTypeData.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </Form.Control>
            </FormGroup>
            <AddHuntingFarm />
          </div>
          <div className="search-wrapper">
            {/* <SearchBar placeholder="Поиск..." /> */}
          </div>
        </div>
        <div className="huntingFarm-middle-block">
          <Table className="custom-table">
            <thead className="thead-block thead-huntingFarm">
              <tr>
                <th>№</th>
                <th>Наименование</th>
                <th>ЮЛ</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody className="tBody-block tBody-huntingFarm">
              {data && data.map(({ name, huntingFarmType, legalPersonName, description, dateAdd, employeeNameAdd }, idx) => {

                const item = {
                  "Охот. угодье": name,
                  "Вид охотугодья": huntingFarmType,
                  "Описание": description,
                  "Юридическое лицо": legalPersonName,
                  "Добавил": employeeNameAdd,
                  "Дата добавления": convertDate(dateAdd),
                }

                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <span>{name}</span>
                      <span>{huntingFarmType}</span>
                    </td>
                    <td>{legalPersonName}</td>
                    <td>
                      <div>
                        <CustomPopover trigger={["hover", "focus"]} placement="left" data={item} />
                        <Tooltip title="Редактировать">
                          <EditHuntingFarm data={item} classs="btn-icon" icon="editPencil" />
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
        <div className="huntingFarm-bottom-block">
          <span>Показанны записей 4 из 212</span>
        </div>
      </div>
      <DeleteItemModal
        id={deleteId}
        deleteItem={(itemId) => dispatch(deleteHuntingFarm(itemId))}
        onModalClose={() => setDeleteId('')} />
    </>
  )
}


export default HuntingFarm;
