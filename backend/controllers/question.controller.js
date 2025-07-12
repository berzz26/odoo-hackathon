import prisma from "../src/config/db.js"
import z from 'zod'

const getAllQuestions = () => { };

const getQuestionById = () => { };

const getTrendingQuestions = () => { };

const getUnansweredQuestions = () => { };

const getAllQuestionsAdmin = () => { };

const getQuestionsByUser = () => { };

const getQuestionsByTag = () => { };

 const askQuestion = async (req, res) => {
    const questionSchema = z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        tags: z.array(z.string()).min(1, "At least one tag is required"),
        acceptedAnswerId: z.string().cuid().optional(),
    });

    try {

        const validated = questionSchema.parse(req.body);

        // Get userId from authenticated user 
        const userId = req.user.id;

        //create quest in DB
        const newQuestion = await prisma.question.create({
            data: {
                title: validated.title,
                description: validated.description,
                tags: validated.tags,
                userId,
                acceptedAnswerId: validated.acceptedAnswerId ?? null,
            },
        });

        return res.status(201).json({ msg: "Question posted", question: newQuestion });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ msg: "Validation error", errors: err.errors });
        }

        console.error("AskQuestion Error:", err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const updateQuestion = () => { };

const deleteQuestion = () => { };

const searchQuestions = () => { };



export {
    getAllQuestions,
    getQuestionById,
    askQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionsByUser,
    getQuestionsByTag,
    searchQuestions,
    getTrendingQuestions,
    getUnansweredQuestions,
    getAllQuestionsAdmin
};