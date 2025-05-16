import bcrypt from "bcrypt";
export async function cryptPassword(password: string) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
    const encodedPassword = await bcrypt.hash(password, saltRounds);
    return encodedPassword;
}

export async function validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}