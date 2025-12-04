const mysql = require('mysql');
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const nodemailer = require("nodemailer");

let otpStore = {};

// ✅ Create Window
function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, "Html/index.html"));
}

app.whenReady().then(createWindow);

// ✅ Configure Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amanshuklashukla567@gmail.com",   // 🔹 यहाँ अपनी Gmail डालो
    pass: "vodxpzfyeguqcjvu"       // 🔹 Gmail App Password
  },
});

// 📌 Send OTP (from renderer)
ipcMain.handle("send-otp", async (event, email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  const mailOptions = {
    from: "amanshuklashukla567@gmail.com",
    to: email,
    subject: "Your OTP to Sign-up for App",
    text: `Your OTP is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully!" };
  } catch (error) {
    return { success: false, message:"failed to send otp" };
  }
});

// 📌 Verify OTP
// 📌 Verify OTP
ipcMain.handle("verify-otp", async (event, email, otp) => {
  let storedOtp = otpStore[email?.trim()?.toLowerCase()];
  
  if (storedOtp && storedOtp.toString() === otp.toString().trim()) {
    delete otpStore[email?.trim()?.toLowerCase()];
    return { success: true, message: "OTP verified!" };
  }
  return { success: false, message: "Invalid OTP" };
});










