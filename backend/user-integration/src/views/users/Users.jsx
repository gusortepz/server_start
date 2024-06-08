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
        prescription: '',
        pdfUrl: '',
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
            pdfUrl: form.pdfUrl,
        };

        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prompt),
        });
        const data = await response.json();
        
        const responseString = data.response;
        form.prescription = responseString;
        setResp(responseString);
    }

    const handleSave = async () => {
        const sendBody = {
            description: form.description,
            prescription: form.prescription,
            context: form.context,
            pdfurl: form.pdfUrl,
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
            <div className="cont" style={{height:'80vh'}}>
                <div className="contTwo" style={{
                    backgroundImage: 'linear-gradient(144deg,#8608b4, #492fed 60%,#bd6fda)',
                    height:'100%',
                    borderRadius:'2rem',
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    }}>
                        <div className="us">Usuario</div>
                            <div>
                                <CardInfo user={user} />
                            </div>
                            <PrevDescription description={descriptions} />
                        </div>
                <div className="contThree">
                    <div className="chat">
                        <div style={{display:'flex'}}>
                            <div style={{display:'flex',flexDirection:'column', width:'50%'}}>
                                <p className="pU">Context</p>
                                <textarea
                                    label="Context"
                                    value={form.context}
                                    name="context"
                                    onChange={handleInputChange}
                                    style={{width: '90%', height: '4rem'}}
                                    className="inputChat"
                                />
                            </div>
                            <div style={{display:'flex',flexDirection:'column', width:'50%'}}>
                                <p className="pU">PDF URL</p>
                                <textarea
                                    label="pdfUrl"
                                    value={form.pdfUrl}
                                    name="pdfUrl"
                                    onChange={handleInputChange}
                                    style={{width: '90%', height: '4rem'}}
                                    className="inputChat"
                                />
                            </div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
                            <p className="pU">Description</p>
                                <textarea
                                    label="Description"
                                    value={form.description}
                                    name="description"
                                    onChange={handleInputChange}
                                    style={{width: '95%', height: '6rem'}}
                                    className="inputChat"
                                />
                                <div>
                                    <button
                                        onClick={handleGenerateHelp}
                                        style={{
                                            height: '35px',
                                            width: '140px',
                                            backgroundImage: 'linear-gradient(144deg,#8608b4, #492fed 60%,#bd6fda)',
                                            border: 'none',
                                            color: 'white',
                                            cursor: 'pointer',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            borderRadius: '5px',
                                            marginTop: '0.5rem',
                                        }}
                                        type="submit">
                                        Generate help
                                    </button>
                                </div>
                        </div>
                    </div>
                    
                        
                        
                        <p className="pU" style={{marginTop:'2rem'}}>Prescription</p>
                        <div className="resp">
                            <textarea defaultValue={resp}
                            label="Prescription"
                            value={form.prescription}
                            name="prescription"
                            onChange={handleInputChange}
                            className="inputChat"
                            style={{ width: '95%', height:'8rem'}}
                            ></textarea>
                        </div>
                        <div>
                            <button
                                onClick={handleSave}
                                style={{
                                    height: '35px',
                                    width: '140px',
                                    backgroundColor: 'black',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    borderRadius: '5px',
                                    marginTop: '0.5rem',
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