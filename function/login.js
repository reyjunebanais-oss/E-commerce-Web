function login(){
        let password = document.getElementById('Password').value;
        let UserName = document.getElementById('UserName').value;
        
         
         
        const SavedPassword = localStorage.getItem('Password');
        const SavedUserName = localStorage.getItem('UserName');
        
        if(password === SavedPassword && UserName === SavedUserName){
            localStorage.removeItem("UserName");
            localStorage.removeItem("Password");
            window.location.href="Dashboard.html";
          
        }
       else if(password === SavedPassword && UserName !== SavedUserName){
            document.getElementById("display1").innerHTML="Wrong user name";
            document.getElementById("display1").style.color="red";
            document.getElementById("UserName").style.border="2px solid red";
            document.getElementById("display2").innerHTML=" ";
            document.getElementById("display2").style.color=" ";
            document.getElementById("Password").style.border="1px solid black";
            
        }
         else if(password !== SavedPassword && UserName === SavedUserName){
            document.getElementById("display2").innerHTML="Wrong password";
            document.getElementById("display2").style.color="red";
            document.getElementById("Password").style.border="2px solid red";
             document.getElementById("display1").innerHTML=" ";
            document.getElementById("display1").style.color=" ";
            document.getElementById("UserName").style.border="1px solid black";
        }
         else if(password !== SavedPassword && UserName !== SavedUserName){
            document.getElementById("display3").innerHTML="Wrong user name and password";
            document.getElementById("display3").style.color="red";
          
        }

    }