import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors({
  origin: '*'
}));

app.use(express.json());
const port = process.env.PORT || 6000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Handle POST requests to /ask
app.post('/ask', async (req, res) => {
  try {
    // Validate user input
    const userStory = req.body.story;
    if (!userStory) {
      throw new Error("Story is required.");
    }

    // Send the user's story to OpenAI for generating response
    const completion = await openai.chat.completions.create({
      messages: [
        { "role": "assistant", "content": `Ask user short questions based on the story: ${userStory}` },
        { "role": "user", "content": userStory },
      ],
      model: "gpt-3.5-turbo",
    });

    const aiResponse = completion.choices[0].message.content;

    // Send AI response back to the user
    res.json({ success: true, message: "AI response", aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));


{
    /* !!!: 
    // Initialize PostgreSQL client
}
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "tales",
    password: "123",
    port: 5432
});

// Connect to the PostgreSQL database
db.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Error connecting to PostgreSQL database:', err));
    
    





    
app.post('/answer', async (req, res) => {
    try {
        // Validate user input
        const userAnswer = req.body.answer;
        const questionId = req.body.questionId;

        if (!userAnswer) {
            throw new Error("Answer is required.");
        }

        // Save user's answer along with questionId in the database
        await db.query("INSERT INTO user_answers(question_id, user_answer) VALUES($1, $2)", [questionId, userAnswer]);
        console.log('User answer saved in the database:', userAnswer);

        // Respond with success message
        res.json({ success: true, message: "Answer saved successfully to database" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});


    */
}