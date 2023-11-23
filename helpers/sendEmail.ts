import nodemailer from "nodemailer"

export const sendEmail = async ({ to, subject, text, html }: any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.AUTH_EMAIL, // generated ethereal user
        pass: process.env.AUTH_PASSWORD, // generated ethereal password
      },
    })

    const mailOptions = {
      from: process.env.AUTH_EMAIL, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html,
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    return error
  }
}
