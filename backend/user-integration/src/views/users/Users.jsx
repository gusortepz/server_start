import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PrevDescription from "./components/PrevDescription";
import CardInfo from "./components/CardInfo";

const Users = () => {
    const { id } = useParams();

    const [form, setForm] = useState({
        description: '',
        prescription: ''
    });

    const [user, setUser] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [resp, setResp] = useState('');

    const fetchDescription = async () => {
        console.log('ID from users', id);
        console.log('fetching description');
        const response = await fetch('http://localhost:3000/description/' + id);
        const data = await response.json();
        setDescriptions(data);
        console.log(data);
    }

    const fetchFeedback = async () => {
        console.log(id);
        const response = await fetch('http://localhost:3000/feedback/' + id);
        const data = await response.json();
        console.log(data);
    }

    const fetchUserById = async () => {
        const response = await fetch('http://localhost:3000/users/' + id);
        const data = await response.json();
        setUser(data);
        return data;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    const handleGenerateHelp = async () => {
        const prompt = {
            prompt: form.description,
        };
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prompt),
        });
        const data = await response.json();
        form.prescription = data;
        const responseString = data.response; // Extraer la respuesta directamente
        setResp(responseString);

        // Aquí el cuerpo de la solicitud debe ser una cadena JSON válida
        const sendBody = {
            description: form.description,
            prescription: responseString
        };

        const send = await fetch(`http://localhost:3000/description/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendBody),
        });

        const s = await send.json();
        console.log(s);
    }

    useEffect(() => {
        fetchDescription();
        fetchFeedback();
        fetchUserById();
    }, []);

    return (
        <>
            <div>Users</div>
            <div>
                <CardInfo user={user} />
                <PrevDescription description={descriptions} />
            </div>
            <div>
                <p>Description</p>
                <textarea
                    label="Description"
                    value={form.description}
                    name="description"
                    onChange={handleInputChange}
                />
                <p>Prescription</p>
                <p>{resp}</p>
                <div>
                    <button
                        onClick={handleGenerateHelp}
                        style={{
                            height: '50px',
                            width: '140px',
                            backgroundColor: '#399C7E',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            borderRadius: '5px',
                        }}
                        type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}

export default Users;
