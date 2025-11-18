import { VerificationCodes } from "../models/index.js";
import { createError } from "../utils/createError.js";
import { createCode } from "../repository/VerificationCodesRepository.js";
import { getUserById } from "./userService.js";
import { Resend } from "resend";

const resend = new Resend("re_xxxxxxxxx");

export async function generateCodeForUser(userId) {
  const user = await getUserById(userId);

  if (!user) throw createError(404, "Not found", "User not Found");
  if (user.is_verified)
    throw createError(
      409,
      "Usuario verificado",
      "El usuario ya está verificado.",
    );

  console.log("eu te encontre al user y ta todo piola");
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos desde ahora

  const codeData = {
    user_id: userId,
    code: code,
    expires_at: expiresAt,
  };

  await createCode(codeData);

  await resend.emails.send({
    from: "Acme <gm4dev@gmail.com>",
    to: [newUser.email],
    subject: `${code}`,
    html: "<strong>it works!</strong>",
  });
}
