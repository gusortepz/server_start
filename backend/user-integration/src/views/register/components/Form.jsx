import { useState } from 'react';
import './Form.css'

const Form = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    lastname: '',
    borncity: '',
    interests: '',
    profession: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = {
      ...form,
      [name]: value,
    };
    setForm(newForm);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      return res.status === 200
        ? alert('Registro exitoso')
        : alert('Error al registrar');
    } catch (error) {
      alert(error);
      throw new Error('Error al registrar');
    }
  };

  return (
    <div>
      <h1 style={{textAlign: 'left'}}>Registro de Usuario</h1>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{display: 'flex', width: '86%'}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
            <p style={{fontFamily:'Open Sans', fontWeight: '700'}}>Nombre</p>
            <input
              style={{ height: '45px', width:'85%', paddingLeft: '5px', marginTop: '-0.8rem', fontFamily:'Open Sans', fontSize:'14px'}}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className='formInput'
            /> 
          </div>
          <div style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
            <p style={{fontFamily:'Open Sans', fontWeight: '700'}}>Apellido</p>
            <input
              style={{ height: '45px', width:'85%', paddingLeft: '5px', marginTop: '-0.8rem', fontFamily:'Open Sans', fontSize:'14px'}}
              type="lastname"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              className='formInput'
            />
          </div>
          
        </div>
        
        <p style={{fontFamily:'Open Sans', fontWeight: '700'}}>Email</p>
        <input
          style={{ height: '45px', width:'80%', paddingLeft: '5px', marginTop: '-0.8rem', fontFamily:'Open Sans', fontSize:'14px'}}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className='formInput'
        />
        <p style={{fontFamily:'Open Sans', fontWeight: '700'}}>Ciudad</p>
        <input
          style={{ height: '45px', width:'80%', paddingLeft: '5px', marginTop: '-0.8rem', fontFamily:'Open Sans', fontSize:'14px'}}
          type="borncity"
          name="borncity"
          value={form.borncity}
          onChange={handleChange}
          className='formInput'
        />
        <p style={{fontFamily:'Open Sans', fontWeight: '700'}}>Intereses</p>
        <input
          style={{ height: '45px', width:'80%', paddingLeft: '5px', marginTop: '-0.8rem', fontFamily:'Open Sans', fontSize:'14px'}}
          type="Interests"
          name="interests"
          value={form.interests}
          onChange={handleChange}
          className='formInput'
        />
        <p style={{fontFamily:'Open Sans', fontWeight: '700'}}>Profesión</p>
        <input
          style={{ height: '45px', width:'80%', paddingLeft: '5px', marginTop: '-0.8rem', fontFamily:'Open Sans', fontSize:'14px'}}
          type="Profession"
          name="profession"
          value={form.profession}
          onChange={handleChange}
          className='formInput'
        />
        <div style={{ paddingTop: '5%', alignItems: 'center', display: 'flex', justifyContent: 'center', width: '82.5%' }}>
          <button
            onClick={handleSubmitForm}
            style={{
              height: '50px',
              width: '30%',
              padding: '5px',
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '15px',
              textAlign: 'center',
              borderRadius: '0.5rem',
              marginTop: '2rem'
            }}
            type="submit"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;