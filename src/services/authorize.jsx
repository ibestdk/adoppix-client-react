import axios from "axios";

//store token ==> session storage

export const authenicate=(response, next) =>{
    if(window !== undefined){
        //save data to session storage
        sessionStorage.setItem("token", response.data)
        console.log("sessionStroage was stored")
        getUserDataApi(response.data);
    }
    next();
    
}

//get user data after login

export const getUserDataApi=(token) => {
console.log("called getuserDataAPI")
    if(window !== undefined){
        if(sessionStorage.getItem("token")){
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                axios.get(`https://testapi.adoppix.com/api/Account/Find`)
                .then(res => {

                    console.log(res.data)
                    sessionStorage.setItem("user", JSON.stringify(res.data.data))
                    console.log("saved user data")
                })
            } else {
                axios.defaults.headers.common['Authorization'] = null;
            }
        }
        else{
            return false;
        }
    }
}

//logout
export const logout=(next)=> {
    if(window !== undefined){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next();
}


//bring data token

export const getToken=()=>{
    if(window !== undefined){
        if(sessionStorage.getItem("token")){
            return sessionStorage.getItem("token")
        }
        else{
            return false;
        }
    }
}


//bring data user

export const getUser=()=>{
    if(window !== undefined){
        if(sessionStorage.getItem("user")){
            console.log(sessionStorage.getItem("user"))
            return  JSON.parse(sessionStorage.getItem("user"))
        }
        else{
            return false;
        }
    }
}