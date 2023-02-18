import InputMask from "react-input-mask";
import axios from 'axios'
import { FormEvent, useState } from 'react'
import './global.css'
import { Loading } from './Loading'

async function getCEP(cep: string) {
  try {
    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    return ({
      address: res.data.logradouro,
      number: '',
      code: res.data.cep,
      state: res.data.uf,
      district: res.data.bairro,
      city: res.data.localidade
    })
  }
  catch (errors) {
    console.log(errors)
  }
}

export function App() {

  const [personal, setPersonal] = useState({
    name: '',
    age: '',
    cpf: '',
    email: '',
    phone: '',
  })

  const [statement, setStatement] = useState({
    code: '',
    address: '',
    number: '',
    district: '',
    state: '',
    city: '',
  })

  const [isSending, setIsSending] = useState(false)
  

  const setCEP = async (cep: string) => {
    const cepCode = cep.replace(/\D/g, '')
    setIsSending(true);
    const response = await getCEP(cepCode)
    setStatement({
      address: response?.address,
      number: '',
      code: response?.code,
      state: response?.state,
      district: response?.district,
      city: response?.city
    })
    setTimeout(() => {getCEP}, 500000);
    setIsSending(false);
    document.getElementById('number')?.focus()
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(statement, personal);
  };

  function handler(evt: any) {
    setStatement({
      ...statement,
      [evt.target.name]: evt.target.value
    });
    setPersonal({
      ...personal,
      [evt.target.name]: evt.target.value
    });
  }

  return (
    <>
    <h1>Cadastro Cliente</h1>
    <form onSubmit={onSubmit}>
      <label>Nome: </label>
      <input
        name='name'
        value={personal.name}
        onChange={handler}
        required={true}
        type='text' /><br />

      <br /><label>Idade: </label>
      <input
        name='age'
        value={personal.age}
        onChange={handler}
        required={true}
        type='text' /><br />

      <br /><label>CPF: </label>
      <InputMask
        mask='999.999.999-99'
        name='cpf'
        value={personal.cpf}
        onChange={handler}
        required={true}
        type='text' /><br />

      <br /><label>CEP: </label>
      <InputMask
        mask='99999-999'
        name='code'
        value={statement.code}
        onChange={handler}
        onBlur={(e) => setCEP(e.target.value)}
        required={true}
        type='text' />
        {isSending ? <Loading />:''}
        <br />

      <br /><label>Endereço: </label>
      <input
        name='address'
        value={statement.address}
        onChange={handler}
        type='text' /><br />

      <br /><label>Número: </label>
      <input
        id="number"
        name='number'
        value={statement.number}
        onChange={handler}
        type='text' /><br />

      <br /><label>Bairro: </label>
      <input
        name='district'
        value={statement.district}
        onChange={handler}
        type='text' /><br />

      <br /><label>Cidade: </label>
      <input
        name='city'
        value={statement.city}
        onChange={handler}
        type='text' /><br />

      <br /><label>Estado: </label>
      <input
        name='state'
        value={statement.state}
        onChange={handler}
        type='text' /><br />

      <br /><label>Email: </label>
      <input
        name='email'
        value={personal.email}
        onChange={handler}
        required={true}
        type='text' /><br />

      <br /><label>Telefone: </label>
      <InputMask
        mask='(99)99999-9999'
        name='phone'
        value={personal.phone}
        onChange={handler}
        type='text' /><br />

      <br /><button type='submit'>
        Enviar
        </button>
    </form>
    </>
  )
}