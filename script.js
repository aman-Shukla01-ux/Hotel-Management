const { ipcRenderer } = require("electron");

async function sendOTP() {
    const sendOTP = document.getElementById("sendOTP");
  let email = document.getElementById("email");
  let emailValue = email.value;
  let errorbox = document.getElementById("alert");
  let enterOTP= document.getElementById("enterOTP");
  const verifyOTP= document.getElementById("verifyOTP");
  const Loader = document.getElementById("Loader1");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if(!emailRegex.test(emailValue)){
  errorbox.style.display="block";
    errorbox.innerText="Enter your correct email";
    errorbox.style.color = "red";
}
 if(emailValue.length==0){
  errorbox.style.display="block";
  errorbox.style.color = "red";
  errorbox.innerText="This filled is required";  
}
if(emailRegex.test(emailValue) && emailValue.length !=0){
  Loader.style.display= "block";
   const response = await ipcRenderer.invoke("send-otp", emailValue);
  document.getElementById("result").innerText = response.message;
  email.disabled = true;
  document.getElementById("result").style.color= "green";
  Loader.style.display = "none";
  enterOTP.style.display="block";
  verifyOTP.style.display="block";
  sendOTP.style.display="none";
  errorbox.style.display="none";
  email.disabled = true;
}
}
async function verifyOTP() {
  const otp = document.getElementById("enterOTP").value;
const createpassword = document.getElementById("create-password");
  const enterOTP = document.getElementById("enterOTP");
  const result = document.getElementById("result");
  const verifyOTPBtn = document.getElementById("verifyOTP");
  const passwordInput = document.getElementById("password");
  const error1 = document.getElementById("error1");
  const error2 = document.getElementById("error2");
  const error3 = document.getElementById("error3");
  const error4 = document.getElementById("error4");
  const password_matching = document.getElementById("password-matching");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const confirmPassword =document.getElementById("create-password");
    let emailValue = document.getElementById("email").value;
  const response = await ipcRenderer.invoke("verify-otp", emailValue, otp);
  document.getElementById("result").innerText = response.message;
const password_alert = document.getElementById("password-alert");
  if (response.success) {
    // Hide OTP input and button
    enterOTP.style.display = "none";
    verifyOTPBtn.style.display = "none";
       result.style.display = "none";
    // Show password fields
    password_alert.style.display = "block";
    passwordInput.style.display = "block";
    password_alert.style.display= "block";
    confirmPasswordInput.style.display = "block";
    //show create password buttion
    createpassword.style.display="block";
   
    // Check password match while typing
    passwordInput.addEventListener("input", () => {
      if(passwordInput.value.length>=8 && passwordInput.value.length<=15){
        error1.style.color = "green";
      }else{
        error1.style.color = "red";
      }

      const CapSmalRegX = /^(?=.*[a-z])(?=.*[A-Z]).+$/; 
      if(CapSmalRegX.test(passwordInput.value)){
        error2.style.color = "green";
      }else{
        error2.style.color = "red";
      }

      const numRegX = /^(?=.*[0-9]).+$/; 
      if(numRegX.test(passwordInput.value)){
        error3.style.color = "green";
      }else{
        error3.style.color = "red";
      }

      const charRegX = /^(?=.*[!@#$%^&*()_+]).+$/; 
      if(charRegX.test(passwordInput.value)){
        error4.style.color = "green";
      }else{
        error4.style.color = "red";
      }

      if(confirmPasswordInput.value!= ""){
        if(confirmPasswordInput.value==passwordInput.value){
          confirmPasswordInput.style.borderColor ="green";
               password_matching.style.display="block";
               password_matching.innerText="Password is match";
               password_matching.style.color="green";

        }else{
          confirmPasswordInput.style.borderColor = "red";
           password_matching.style.display="block";
               password_matching.innerText="Password is not match";
               password_matching.style.color="red";
        }
      }

      if(confirmPasswordInput.value=="" && passwordInput.value==""){
        password_matching.style.display="none";
      }
    });

    confirmPasswordInput.addEventListener("input", () => {
        if(confirmPasswordInput.value==passwordInput.value){
              
               password_matching.style.display="block";
               confirmPasswordInput.style.borderColor = "green";
               password_matching.innerText="Password is match";
               password_matching.style.color="green";
        }else{
          confirmPasswordInput.style.borderColor ="red";
           password_matching.style.display="block";
               password_matching.innerText="Password is not match";
               password_matching.style.color="red";
        }

        if(confirmPasswordInput.value=="" && passwordInput.value==""){
          password_matching.style.display="none";
        }
    });
    
    createpassword.addEventListener("click", () => {
        if (passwordInput.value == confirmPasswordInput.value){
          alert("password have created");
        }
    });
  }
}
//Home page
function manubar(){
  list =document.getElementById("list");
  list.classList.toggle("active");
}
//Menu page
 function addImage() {
      const input = document.getElementById('imageInput');
      const container = document.getElementById('imgContainer');

      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const imgDiv = document.createElement('div');
          imgDiv.style.display = "inline-block";
          imgDiv.style.position = "relative";

          const img = document.createElement('img');
          img.src = e.target.result;

          const delBtn = document.createElement('button');
          delBtn.innerText = "Delete";
          delBtn.style.position = "absolute";
          delBtn.style.bottom = "10px";
          delBtn.style.left = "50%";
          delBtn.style.transform = "translateX(-50%)";
          delBtn.onclick = () => imgDiv.remove();

          imgDiv.appendChild(img);
          imgDiv.appendChild(delBtn);
          container.appendChild(imgDiv);
        };

        reader.readAsDataURL(input.files[0]);
      }
    }


    //menu page //
    
