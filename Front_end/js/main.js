// document.addEventListener("DOMContentLoaded",function () { 
//    const callAboutPage=async()=>{
//        try{
//             const res=await fetch('http://127.0.0.1:9000/index',{
//                 method:"GET",
//                 headers:{
//                     Accept:"application/json",
//                     "Content-Type":"application/json"
//                 },
//                 credentials:"include"
//             });
//             const data=await res.json();
//             console.log(data);
//             if(!res.status===200){
//                 throw new Error(res.Error);
//             }
//        }
//        catch(e){
//            console.log(err);
//            window.location.href="http://127.0.0.1:5500/Jan-Suvidha-Portal_2.0-main/Front_end/src/index.html"
//        }
//    }
// })
// fetch('http://localhost:9000/index')
//   .then(response => response.json())
//   .then(data => {
//     const dynamicDataElement = document.getElementsByClassName('modals');
//      console.log(data);
//     // Update the dynamic data in the HTML
//     data.forEach(item => {
//       const li = document.createElement('li');
//       li.textContent = item.title;
//       dynamicDataElement.appendChild(li);
//     });
//   })
//   .catch(error => console.error(error));
document.addEventListener('DOMContentLoaded', function() {
    const registerform = document.querySelector('#register-form');
    const Signup = document.getElementById('signup');
    if (Signup) {
        console.log(Signup);
    } else {
        console.log('No element with ID "signup" found');
    }
    Signup.addEventListener("click", async(e) => {
        e.preventDefault();
        let formData = new FormData(registerform);
        console.log(formData);
        let Values = [...formData.entries()];
        const [name,email,birthdate,gender,password,cpassword,cast,income,occupation]=Values;
        console.log(name[1]);
        const res=await fetch("http://127.0.0.1:9000/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name[1],email:email[1],birthdate:birthdate[1],gender:gender[1],password:password[1],cpassword:cpassword[1],cast:cast[1],income:income[1],occupation:occupation[1]
            })
            })
            const final_res=await res.json();
            console.log(final_res);
            if(res.status===404 || res.status===422 || res.status==500 || !final_res){
                window.alert("invalid Registration");
                // console.log("invalid Registration ");
            }
            else{
                window.alert("valid Registration");
                // console.log("valid Registration");
                window.location.href = "login";
            }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const loginform = document.querySelector('#login-form');
    const Signin = document.querySelector('input[name="signin"]');
    if (Signin) {
      console.log(Signin);
    } else {
      console.log('No element with ID "signin" found');
    }
Signin.addEventListener("click", async(e) => {
    e.preventDefault();
    const formData = new FormData(loginform);
    const values = [...formData.entries()];
    const email=values[0][1];
    const password=values[1][1];
    console.log(email,password);
    const res=await fetch("http://127.0.0.1:9000/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            email,password
        })
    });
    const final_res=await res.json();
   
    if(res.status===404 || !final_res){
        window.alert("invalid Login");
        console.log("invalid Login");
    }
    else{
        window.alert("valid Login");
        // console.log("valid Login");
        // console.log(window.location.href);
        window.location.href ="/index";
    }
})
});