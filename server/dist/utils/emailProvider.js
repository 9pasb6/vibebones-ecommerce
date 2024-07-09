"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRecoverPassword = exports.emailRegister = void 0;
const nodemailer = require("nodemailer");
const emailRegister = (datos) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, token } = datos;
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    // informacion del email  
    yield transport.sendMail({
        from: "Project Management - Pasb <accounts@projectManagement.com>",
        to: email,
        subject: "Project Management - Confirm your account",
        text: "Confirm your account on Project Management ",
        html: `
    <p>Hi!👋🏻:${name} Your account is almost ready, you just have to confirm it in the following link:</p>
    
    <a href="${process.env.FRONTEND_URL}/confirm_account/${token}"> Confirm your account </a>
    
    <p>If you did not create  this account, you can ignore the email </p>
    `
    });
});
exports.emailRegister = emailRegister;
const emailRecoverPassword = (datos) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, token } = datos;
    //TODO: Mover hacia variables de entorno
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    // informacion del email  
    yield transport.sendMail({
        from: "VibeBones - Pasb <accounts@projectManagement.com>",
        to: email,
        subject: "VibeBones - Change your password",
        text: "Change your password",
        html: `
  <p>Hi!👋🏻:${name} You can change your password by following the link:</p>
  
  <a href="${process.env.FRONTEND_URL}/lost-password/${token}"> Change your password </a>
  
  <p>If you don't want to change your password, you can ignore the email. </p>
  `
    });
});
exports.emailRecoverPassword = emailRecoverPassword;
//# sourceMappingURL=emailProvider.js.map