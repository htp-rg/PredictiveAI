let sentCode = null;
let otpExpiry = null;
let countdownTimer = null;

const sendCodeBtn = document.getElementById("sendCodeBtn");
const timerDiv = document.getElementById("timer");
const messageDiv = document.getElementById("message");

sendCodeBtn.addEventListener("click", function() {
  const userEmail = document.getElementById("email").value.trim();
  if (!userEmail) {
    alert("Please enter your email first.");
    return;
  }

 
  sentCode = Math.floor(100000 + Math.random() * 900000);
  const expiryTime = new Date(Date.now() + 15 * 60 * 1000);
  otpExpiry = expiryTime;

  
  emailjs.send("service_qvm338i", "template_koj1ggb", {
    to_email: userEmail,
    passcode: sentCode,
    time: expiryTime.toLocaleTimeString()
  })
  .then(response => {
    messageDiv.innerHTML = `<p style="color:green;">Verification code sent to ${userEmail} ✅</p>`;
    console.log("SUCCESS!", response.status, response.text);
  })
  .catch(error => {
    messageDiv.innerHTML = `<p style="color:red;">Error sending email ❌</p>`;
    console.error("FAILED...", error);
  });

 
  sendCodeBtn.disabled = true;
  let timeLeft = 60;
  timerDiv.textContent = `Resend code in ${timeLeft}s`;

  countdownTimer = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = `Resend code in ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      sendCodeBtn.disabled = false;
      timerDiv.textContent = "You can resend the code now";
    }
  }, 1000);
});


document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const password = document.getElementById("password").value.trim();
  const codeInput = document.getElementById("codeInput").value.trim();
  const correctPassword = "orariojames"; // demo password

  const now = new Date();

  if (!sentCode) {
    messageDiv.innerHTML = `<p style="color:red;">Please request a verification code first ❌</p>`;
  } else if (now > otpExpiry) {
    messageDiv.innerHTML = `<p style="color:red;">OTP expired! Please request a new code ❌</p>`;
  } else if (password === correctPassword && codeInput == sentCode) {
    window.location.href = "dash.html";
  } else {
    messageDiv.innerHTML = `<p style="color:red;">Invalid password or verification code ❌</p>`;
  }
});
