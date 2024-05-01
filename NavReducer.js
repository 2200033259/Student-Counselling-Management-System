
const initstate = "Login"
export default function NavReducer(state=initstate,action){
    switch(action.type){
        case "Login":
           return"Login";
        case "Registration":
           return"Registration";
        case "Profile":
           return"Profile";   
        case "Update":
           return "Update";
        case "Delete":
           return "Delete";        
        default:
           return "Login";  
    }

}