const prisma = require('../prisma/PrismaConnect');

const getNotes = async (req, res) => {
    try {
        const notes = await prisma.note.findMany({
            where: {
                userId: parseInt(req.params.id)
            },
            select: {
                id: true,
                title: true,
                content: true
            }
        });
        res.json(notes)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    await prisma.$disconnect();
}
 
const postNote = async (req, res) => {
    const { title, content} = req.body;
    try {
        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId: parseInt(req.params.id)
            }
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateNote = async (req, res) => {
    const { title, content} = req.body;
    try {
        const note = await prisma.note.update({
            where: { id: parseInt(req.params.noteId) },
            data: {
                title,
                content
            }
        });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteNote = async (req, res) => {
    try {
        const note = await prisma.note.delete({
            where: { id: parseInt(req.params.noteId) },
        });
        res.json({ message: "Note deleted!" });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getNotes, postNote, updateNote, deleteNote }
