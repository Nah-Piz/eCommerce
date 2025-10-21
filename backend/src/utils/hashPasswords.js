import bcrypt from 'bcrypt'

export const hashPassword = (password) => {
    const rounds = 10;
    const salt = bcrypt.genSaltSync(rounds);

    return bcrypt.hashSync(password, salt);
}

export const comparePasswords = (password, hashed) => {
    return bcrypt.compareSync(password,hashed)
}