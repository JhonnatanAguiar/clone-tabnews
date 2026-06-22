import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getNumberOfRounds();

  const pepperPassword = password + process.env.PEPPER;

  return await bcryptjs.hash(pepperPassword, rounds);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providedPassword, storedPassword) {
  const providedPasswordWithPepper = providedPassword + process.env.PEPPER;
  return await bcryptjs.compare(providedPasswordWithPepper, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
