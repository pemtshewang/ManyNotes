const bcrypt = require("bcrypt")
const prisma = require('../prisma/PrismaConnect');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    // the associated email is not found
    if(user == null) {
        return res.status(400).json({ error: 'Your email is incorrect' })
    }

    // Comparing the password and authenticating the user
    const passwordMatches = await bcrypt.compare(password, user.password);
    if(passwordMatches) {
        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email
        })
    }
    // when user is found and password is wrong
    return res.status(400).json({ error: 'Invalid password' })
}

module.exports = {login}
