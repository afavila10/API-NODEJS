import appBcrypt from 'bcrypt';
const saltRounds = 10;

export const encryptPassword = async (password) => {
    try {
        const hashedPassword = await appBcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error compare the hash',error);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    try {
        const Match = await appBcrypt.compare(password, hashedPassword);
        return Match;
    } catch (error) {
        console.error('Error compare the hash',error);
        throw error;
    }
};