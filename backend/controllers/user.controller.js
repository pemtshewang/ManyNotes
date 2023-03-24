const prisma = require("../prisma/PrismaConnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const makePassword = async(password) => {
    const saltRounds = 1
    const hashedPassword = await bcrypt.hash(password, saltRounds) 
    return hashedPassword
}

const getUser = async (req, res) => {
    try {
        const user =  await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
   await prisma.$disconnect();
};


const createUser = async (req, res) => {
    const {name, email , password} = req.body;
    const hashedPassword = await makePassword(password)
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });
        const accessToken = jwt.sign(user, process.env.JWT_SECRET,
            { expiresIn: '1h' });
        res.status(201).json({
            accessToken: accessToken,
            id: user.id,
            name,
            email
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
    await prisma.$disconnect();
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json({ message: "User deleted!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    await prisma.$disconnect();
};

module.exports = { getUser, createUser, deleteUser }
