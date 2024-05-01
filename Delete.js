import axios from 'axios';
import { useState } from 'react';

function Delete() {
    const [username, setUsername] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    const handleDelete = async (event) => {
        event.preventDefault();

        // Check if username is empty
        if (!username) {
            setDeleteMessage('Username cannot be empty');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/delete', {
                un: username,
            });

            if (response.data === 'Deleted successfully') {
                setDeleteMessage(`User '${username}' deleted successfully`);
            } else {
                setDeleteMessage(`Error deleting user: ${response.data}`);
            }
        } catch (error) {
            console.error(error);
            setDeleteMessage('Error deleting user: Network error');
        }
    };

    return (
        <div id="idlogin" className="login-form" style={{ border: "1px solid red", width: "350px", height: "250px", borderRadius: "25px", backgroundColor: "ivory", padding: "35px", marginTop: "100px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" }}>
            <p style={{ textShadow: "1px 2px 2px black", fontSize: "25px" }}>Delete</p> <br />
            <form style={{ margin: "auto", width: "80%" }}>
                <label htmlFor="un">Username:</label><br />
                <input type="text" id="un" name="un" value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: "8px", borderRadius: "4px", width: "100%", marginBottom: "10px" }} /><br />
                
                <button onClick={handleDelete} style={{ padding: "10px 20px", backgroundColor: "#4caf50", color: "white", borderRadius: "4px", border: "none", cursor: "pointer", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>Delete</button><br />
                
                {deleteMessage && <p>{deleteMessage}</p>}
            </form>
        </div>
    );
}

export default Delete;
