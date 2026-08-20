function SignUp(){
        let Password = document.getElementById('Password').value;
        let UserName = document.getElementById('UserName').value;
        
        localStorage.removeItem("UserName");
            localStorage.removeItem("Password");
            
        if(Password !== " " && UserName !== " "){
            localStorage.setItem("UserName", UserName);
            localStorage.setItem("Password", Password);
            alert("saved");
            window.location.href="index.html";
        }
 
       }