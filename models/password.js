import bcryptjs from "bcryptjs";
import { ValidationError } from "infra/errors";

async function hash(password) {
  validatePasswordValue(password);

  const rounds = getNumberOfRounds();

  const pepperPassword = addPepper(password);

  return await bcryptjs.hash(pepperPassword, rounds);
}

async function compare(providedPassword, storedPassword) {
  const providedPasswordWithPepper = addPepper(providedPassword);
  return await bcryptjs.compare(providedPasswordWithPepper, storedPassword);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

function validatePasswordValue(password) {
  if (!isValidPasswordValue(password)) {
    throw new ValidationError({
      message: "A senha é obrigatória e deve ser uma string não vazia.",
      action: "Informe uma senha válida para continuar.",
    });
  }
}

function isValidPasswordValue(password) {
  return typeof password === "string" && password.trim().length > 0;
}

function addPepper(password) {
  const pepper = process.env.PEPPER;

  if (typeof pepper !== "string" || pepper.length === 0) {
    throw new Error("A variável de ambiente PEPPER não foi configurada.");
  }

  return password + pepper;
}

const password = {
  hash,
  compare,
};

export default password;
