import axios from 'axios';
import { useState } from 'react';

function Update() {
    const [username, setUsername] = useState('');
    const [existingPassword, setExistingPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    function handleLogin(event) {
        event.preventDefault();
        
        axios.post('http://localhost:8081/update', {
            un: username,
            pw: existingPassword,
            pwd: newPassword,
        }).then((res) => {
            console.log(res.data);
            setMessage(res.data);
        }).catch(error => {
            console.error('Error updating user:', error);
            setMessage('Error: Network error');
        });
    }

    return (
        <div className="update-form" style={{ border: '1px solid red', width: '350px', height: '400px', borderRadius: '25px', backgroundColor: 'ivory', padding: '30px', marginTop: '80px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textShadow: '1px 2px 2px black', fontSize: '25px', textAlign: 'center' }}>Update</h2>
            <form style={{ margin: 'auto', width: '80%' }}>
                <label htmlFor="un">Username:</label><br />
                <input type="text" id="un" name="un" value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: '8px', borderRadius: '4px', width: '100%', marginBottom: '10px' }} /><br />

                <label htmlFor="pw">Existing Password:</label><br />
                <input type="password" id="pw" name="pw" value={existingPassword} onChange={(e) => setExistingPassword(e.target.value)} style={{ padding: '8px', borderRadius: '4px', width: '100%', marginBottom: '10px' }} /><br />

                <label htmlFor="pwd">New Password:</label><br />
                <input type="password" id="pwd" name="pwd" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ padding: '8px', borderRadius: '4px', width: '100%', marginBottom: '10px' }} /><br />

                <button onClick={handleLogin} style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>Update</button><br />

                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default Update;
