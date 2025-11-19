import VerificationCodes from "../models/VerificationCodes.js";
import baseRepository from "./BaseRepository.js";

export async function createCode(codeData) {
  return baseRepository.create(VerificationCodes, codeData);
}
