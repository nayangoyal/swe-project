// src/utils/auth.js

const verifyToken = () => {
    const userToken = localStorage.getItem('userToken');
    const emailid = localStorage.getItem('userEmail');    
    // Implement your token verification logic here
    // For example, decode the token and check if the user has admin privileges
  
    // Dummy logic for illustration (replace with your actual logic)
    let isvalid2 = 0;
    if(JSON.parse(emailid) === "21ucs137@lnmiit.ac.in")
    {
        console.log()
        isvalid2 =1;
    }

    const isAdmin = userToken && isvalid2;
    return isAdmin;
  };
  
  export default verifyToken;
  