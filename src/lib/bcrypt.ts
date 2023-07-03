import bcrypt from "bcryptjs"

export const PASSWORD_SALT = 10

export const hashPassword = async (password: string) => {
  const genSalt = await bcrypt.genSalt(PASSWORD_SALT)

  return await bcrypt.hash(password, genSalt)
}

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword)
}
