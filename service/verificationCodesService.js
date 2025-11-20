import { VerificationCodes, Users } from "../models/index.js";
import { createError } from "../utils/createError.js";
import { createCode } from "../repository/VerificationCodesRepository.js";
import { getUserbyEmail } from "./userService.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function verifyCodeForUser(email, code) {
  console.log("1) Buscando usuario...");
  console.log("Email recibido:", JSON.stringify(email));
  console.log("Tipo:", typeof email);

  const user = await getUserbyEmail(email);
  console.log("USER ENCONTRADO:", user);

  if (!user) throw createError(404, "Usuario no encontrado");

  if (user.is_verified) throw createError(409, "Usuario ya verificado");

  console.log("2) Buscando código...");
  const verification = await VerificationCodes.findOne({
    where: {
      user_id: user.userId,
      code,
      used: false,
    },
  });

  console.log("VERIFICATION:", verification?.toJSON?.());

  if (!verification) throw createError(400, "Código incorrecto");

  if (verification.expires_at < new Date())
    throw createError(400, "El código expiró");

  console.log("3) Actualizando usuario...");
  const updatedUser = await Users.update(
    { is_verified: true },
    { where: { userId: user.userId } },
  );
  console.log("UPDATE USER RESULT:", updatedUser);

  console.log("4) Marcando código como usado...");
  const updatedCode = await VerificationCodes.update(
    { used: true },
    { where: { id: verification.id } },
  );
  console.log("UPDATE CODE RESULT:", updatedCode);

  console.log("5) FIN.");

  return { message: "Usuario verificado correctamente" };
}
