import 'dotenv/config'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.zeptomail.com",
    port: 587,
    auth: {
      user: 'emailapikey',
      pass: 'wSsVR611/UP3D/9/mTGkc+k5nFRTAlvyFER50ATwvyL6T6zAosc5wUbJUFXxFPlNEm47QDoX9eoszEoHgDsP2dsqylFUWSiF9mqRe1U4J3x17qnvhDzPVmldkBKOLIIBxg5in2NpEMwi+g==',
    },
  });

export default transporter;