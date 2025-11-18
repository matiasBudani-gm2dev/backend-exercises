import { VerificationCodes } from "../models/index.js";
import baseRepository from "./BaseRepository.js";

export async function createCode(codeData) {
  console.log(codeData);
  return baseRepository.create(VerificationCodes, codeData);
}
