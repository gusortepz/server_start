import Form from './components/Form';
import form from '../../assets/dashboard.svg'

const Register = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: '70vh',
          width: '50vw',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          margin: '5rem',
        }}
      >
        <img src={form} alt="formImage" width={700} />
      </div>
      <div style={{ width: '50vw' }}>
        <Form />
      </div>
    </div>
  );
};

export default Register;