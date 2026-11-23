import { ChatGroq } from "@langchain/groq";
import { config } from './../../config/env.js';


const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey:config.GROQ_API_KEY
})

export default model