import { useState, useEffect } from 'react';
import Card from './components/Card';
import './Dashboard.css'

const Dashboard = ({ fil }) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/users');
            const data = await response.json();
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Usuarios</h1>
            <div className='dash'>
                {users.filter(user => user.name && user.name.includes(fil)).map(user => (
                <div key={user.id}>
                    <Card user={user} />
                </div>
            ))}
            </div>
            
        </div>
    );
}

export default Dashboard;
