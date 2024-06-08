import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PrevDescription from "./components/PrevDescription";
import CardInfo from "./components/CardInfo";
import './Users.css'

const Users = () => {
    const { id } = useParams();

    const [form, setForm] = useState({
        context: '',
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
            context: form.context,
        };
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prompt),
        });
        const data = await response.json();
        
        const responseString = data.response; // Extraer la respuesta directamente
        form.prescription = responseString;
        setResp(responseString);
    }

    const handleSave = async () => {
        const sendBody = {
            description: form.description,
            prescription: form.prescription
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
            <div className="contOne">
                <div className="us">Usuario</div>
                <div>
                    <CardInfo user={user} />
                    
                </div>
            </div>
            <div className="cont">
                <div className="contTwo">
                    <PrevDescription description={descriptions} />
                </div>
                <div className="contThree">
                    <div className="chat">
                        <div className="chatO">
                            <p>Context</p>
                                <textarea
                                    label="Context"
                                    value={form.context}
                                    name="context"
                                    onChange={handleInputChange}
                                />
                        </div>
                        <div className="chatT">
                            <p>Description</p>
                                <textarea
                                    label="Description"
                                    value={form.description}
                                    name="description"
                                    onChange={handleInputChange}
                                />
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
                                        Generate help
                                    </button>
                                </div>
                        </div>
                    </div>
                    
                        
                        
                        <p>Prescription</p>
                        <div className="resp">
                            <textarea defaultValue={resp}
                            label="Prescription"
                            value={form.prescription}
                            name="prescription"
                            onChange={handleInputChange}></textarea>
                        </div>
                        <div>
                            <button
                                onClick={handleSave}
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
                                Save
                            </button>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default Users;
