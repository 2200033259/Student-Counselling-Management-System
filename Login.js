import axios from 'axios';

export default function Login({ store }) {
    function handleSubmit() {
        console.log({
            un: document.getElementById("idun").value,
            pw: document.getElementsByName("pw")[0].value
        });

        axios.post('http://localhost:8081/check', {
            un: document.getElementById("idun").value,
            pw: document.getElementsByName("pw")[0].value
        }).then((response) => {
            console.log(response.data);
            if (response.data !== "Fail") {
                store.dispatch({ "type": "login", "data": { "un": response.data.name } });
            }
        });
    }

    function handleMouseOver() {
        document.getElementById("idlogin").style.boxShadow = "10px 10px 15px grey";
    }

    function handleMouseLeave() {
        document.getElementById("idlogin").style.boxShadow = "0px 0px 0px grey";
    }

    return (
        <div id="idlogin" className="login-form" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} style={{ border: "1px solid red", width: "350px", height: "350px", borderRadius: "25px", backgroundColor: "ivory", padding: "100px", marginTop: "90px" }}>
            <p style={{ textShadow: "1px 2px 2px black", fontSize: "25px" }}>Login Page</p>
            <br />
            Username: <input type="text" name="un" id="idun" /> <br /><br />
            Password: <input type="password" name="pw" id="idpw" /> <br /><br />
            <button onClick={handleSubmit} style={{ padding: "10px 20px", backgroundColor: "#4caf50", color: "white", borderRadius: "4px", border: "none", cursor: "pointer" }}>Login</button>
        </div>
    );
}
