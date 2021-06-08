import React, { Fragment, useState } from 'react';
import './App.css';
import MaskedInput from './MaskedInput';
import { Formik, Field, Form } from 'formik';
import { Container, Row, Col } from 'reactstrap';
import { Carousel } from '3d-react-carousal';

const initialValues = {
  cpf: '',
  cnpj: ''
};
function App() {
  const [values, setValues] = useState(initialValues);


  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function onSubmit(values, actions) {
    console.log('SUBMIT', values);
  }


  function onBlurCep(ev, setFieldValue) {
    const { value } = ev.target;

    const cep = value?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue('rua', data.logradouro);
        setFieldValue('bairro', data.bairro);
        setFieldValue('cidade', data.localidade);
        setFieldValue('uf', data.uf);
      });
  }




  let slides = [

    <Container >

      <Row>
        <Col md='12' lg="12">


          <div className="form-control-group">
            <label>Nome</label>
            <Field name="nome" type="text" />
          </div>

          <div className="form-control-group">
            <label>Rua</label>
            <Field name="rua" type="text" />
          </div>



        </Col>

      </Row>
    </Container>,


    <Container>

      <Row>
        <Col md='12' lg="12">

          <div className="form-control-group">
            <label>Número</label>
            <Field name="numero" type="text" />
          </div>
          <div className="form-control-group">
            <label>Complemento</label>
            <Field name="complemento" type="text" />
          </div>
          <div className="form-control-group">
            <label>bairro</label>
            <Field name="bairro" type="text" />
          </div>



        </Col>

      </Row>
    </Container>,


    <Container>

      <Row>
        <Col md='12' lg="12">


          <div className="form-control-group">
            <label>Cidade</label>
            <Field name="cidade" type="text" />
          </div>

          <div className="form-control-group">
            <label>Estado</label>
            <Field name="uf" type="text" />
          </div>

          <div className="form-control-group">

            <label>Cpf</label>

            <MaskedInput
              name="cpf"
              mask="999.999.999-99"
              value={values.cpf}
              onChange={handleChange}
            />

          </div>

        </Col>

      </Row>
    </Container>,

  ];

  return (<div className="App">

    <Formik
      onSubmit={onSubmit}
      validateOnMount
      initialValues={{
        nome: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        cep: '',
        nome: '',
        rua: '',


      }}



      render={({ isValid, setFieldValue }) => (



        <Form>


          <div className="form-control-group">
            <label>Cep</label>
            <Field name="cep" type="text" onBlur={(ev) => onBlurCep(ev, setFieldValue)} />


          </div>

          <Carousel slides={slides} autoplay={false} interval={1000} />


          <button className="submiT" type="submit" disabled={!isValid}>Enviar</button>

        </Form>
      )}
    />


  </div>
  );
}
export default App;


