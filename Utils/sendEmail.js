import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "m7mohamed2021@gmail.com",
      pass: "xlba hzyl yeyi ipac"
    }
  });

  await transporter.sendMail({
    from: `"my app" <m7mohamed2021@gmail.com>`,
    to,
    subject,
    html
  });
};

export const confirmEmailTemplate = (name, confirmLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Welcome</title>
<style>
  body {
    background-color: #f4f6f8;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  }
  .header {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    padding: 30px;
    text-align: center;
  }
  .content {
    padding: 30px;
    color: #333;
    line-height: 1.6;
  }
  .btn {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 25px;
    background: #667eea;
    color: #fff;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
  }
  .footer {
    background: #f1f1f1;
    text-align: center;
    padding: 15px;
    font-size: 12px;
    color: #777;
  }
</style>
</head>
<body>

<div class="container">
  <div class="header">
    <h1>Welcome </h1>
  </div>

  <div class="content">
    <h2>Hello ${name} </h2>
    <p>
      Your account has been created successfully.<br/>
      Please confirm your email to activate your account.
    </p>


    <a href="${confirmLink}" class="btn">
      Confirm Email 
    </a>

    <p style="margin-top:15px;font-size:13px;color:#666;">
      If the button doesn't work, copy and paste this link in your browser:<br/>
      ${confirmLink}
    </p>
  </div>

  <div class="footer">
    © 2026 Node.js Lab Project
  </div>
</div>

</body>
</html>
`;
