/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from '@syncfusion/ej2-react-grids';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { employeesGrid } from '../data/dummy';
import { Header } from '../components';

const Employees = () => {
  const toolbarOptions = ['Search'];
  const [validated, setValidated] = useState(false);
  const localData = JSON.parse(localStorage.getItem('EmployeesData'));
  function init() {
    if (localData === null) {
      return [];
    }
    return localData;
  }
  const [employeesData, setEmployeesData] = useState(init);
  const EmployeeIDRef = useRef(null);
  const EmployeeNameRef = useRef(null);
  const TitleRef = useRef(null);
  const HireDateIDRef = useRef(null);
  const CountryRef = useRef(null);
  const ReportsToRef = useRef(null);

  // const handleForm = (e) => {
  //   e.preventDefault();

  // };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setEmployeesData((prevData) => [
      ...prevData,
      {
        EmployeeID: EmployeeIDRef.current.value,
        EmployeeName: EmployeeNameRef.current.value,
        Title: TitleRef.current.value,
        HireDate: HireDateIDRef.current.value,
        Country: CountryRef.current.value,
        ReportsTo: ReportsToRef.current.value,
      },
    ]);
    setValidated(true);
  };

  useEffect(() => {
    localStorage.setItem('EmployeesData', JSON.stringify(employeesData));
  }, [employeesData]);
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>EmployeeID</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="EmployeeID"
              defaultValue=""
              ref={EmployeeIDRef}
            />
            <Form.Control.Feedback>EmployeeID</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label> EmployeeName</Form.Label>
            <Form.Control
              required
              type="text"
              ref={EmployeeNameRef}
              placeholder="Name"
              defaultValue=""
            />
            <Form.Control.Feedback>EmployeeName</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label> Title</Form.Label>
            <Form.Control
              required
              type="text"
              ref={TitleRef}
              placeholder="Title"
              defaultValue=""
            />
            <Form.Control.Feedback>Title</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>HireDate</Form.Label>
            <Form.Control
              type="date"
              placeholder="HireDate"
              ref={HireDateIDRef}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Country"
              ref={CountryRef}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Country.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>ReportsTo</Form.Label>
            <Form.Control
              type="text"
              placeholder="ReportsTo"
              ref={ReportsToRef}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Mentor.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">Submit form</Button>
      </Form>
      <GridComponent
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default Employees;
