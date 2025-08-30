let sentCode = null;
let otpExpiry = null;

document.getElementById("sendCodeBtn").addEventListener("click", function() {
  const userEmail = document.getElementById("email").value.trim();
  if (!userEmail) {
    alert("Please enter your email first.");
    return;
  }


  sentCode = Math.floor(100000 + Math.random() * 900000);

 
  const expiryTime = new Date(Date.now() + 15*60*1000);
  otpExpiry = expiryTime;


 emailjs.send("service_qvm338i","template_koj1ggb");
    user_email: userEmail,
    passcode: sentCode,
    time: expiryTime.toLocaleTimeString()
  })
  .then(function(response) {
    document.getElementById("message").innerHTML =
      `<p style="color:green;">Verification code sent to ${userEmail} ✅</p>`;
    console.log("SUCCESS!", response.status, response.text);
  }, function(error) {
    document.getElementById("message").innerHTML =
      `<p style="color:red;">Error sending email ❌</p>`;
    console.error("FAILED...", error);
  });
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const password = document.getElementById("password").value;
  const codeInput = document.getElementById("codeInput").value.trim();
  const correctPassword = "orariojames"; 

  const now = new Date();
  if (!sentCode) {
    document.getElementById("message").innerHTML =
      `<p style="color:red;">Please request a verification code first ❌</p>`;
  } else if (now > otpExpiry) {
    document.getElementById("message").innerHTML =
      `<p style="color:red;">OTP expired! Please request a new code ❌</p>`;
  } else if (password === correctPassword && codeInput == sentCode) {
    window.location.href = "dash.html"; 
  } else {
    document.getElementById("message").innerHTML =
      `<p style="color:red;">Invalid password or verification code ❌</p>`;
  }
});
