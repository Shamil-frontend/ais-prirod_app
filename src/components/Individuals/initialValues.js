const initialValues = {
  lastName: 'Тестов',
  firstName: 'Тест',
  middleName: 'Тестович',
  birthDate: new Date(),
  birthPlace: 'Р.Дагестан, г.Махачкала',
  identityDocument: {
    serial: '2342',
    number: '234234',
    issueDate: new Date(),
    issuePlace: 'Отделом УФМС России по респ. Дагестан в Советском р-не гор. Махачкалы',
    code: '323423',
    addressRegistration: 'ул.Ленина, дом-106, строение-1 ',
  },
  addressLiving: 'ул.Ленина, дом-106 строение-1 ',
  phoneNumber1: '+7 (893) 243-45-34',
  phoneNumber2: '+7 (988) 456-34-53',
  email: 'chelovek@mail.ru',
  snils: '000-000-000-00',
  gender: "0",
  inn: '000000000000',
  photo: null,
  orgName: 'WEBSystems',
  orgAddress: 'г.Махачкала, ул.Ленина, дом-4',
  orgEmail: 'Systems@mail.ru',
  orgPhone: '+7 (896) 757-85-67',
  legalForm: 'ОАО',
  isLicenseVisible: false,
  huntingLicenseData: {
    serialLicense: '05',
    numberLicense: '065688',
    issueDate: new Date(),
    reestrDate: new Date(),
    employeesAuthorized: 'Тестов Тест Тестович',
    issued: 'Минприроды РД',
    // cancelledDate: null,
    // cancelledGround: 'Кяхулай'
  }
};

export default initialValues;
