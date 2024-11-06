import express from 'express';
import { PersonalizeRuntimeClient, GetRecommendationsCommand } from "@aws-sdk/client-personalize-runtime";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const config = {
    region: process.env.AWS_REGION, // Use the region from the .env file
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key from .env
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY // Secret key from .env
    }
};

const app = express();
app.use(cors());

// Middleware to log requests
app.use((req, res, next) => {
    const start = Date.now(); // Record the start time
    const remoteAddress = req.ip; // Get the remote address

    res.on('finish', () => { // Listen for the finish event
        const duration = Date.now() - start; // Calculate duration
        const timestamp = new Date().toISOString();
        const statusCode = res.statusCode; // Get response status code
        console.log(`[${timestamp}] ${req.method} ${req.url} ${statusCode} - ${remoteAddress} - ${duration}ms`);
    });

    next(); // Pass control to the next middleware/route handler
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

app.get('/recommendations', async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        res.status(400).send({'message': 'userId is required'});
        return;
    }

    const client = new PersonalizeRuntimeClient(config);
    const input = { 
        userId: userId,
        numResults: 10,
        filterArn: process.env.FILTER_ARN,
        recommenderArn: process.env.RECOMMENDER_ARN
      };
    try {
        const command = new GetRecommendationsCommand(input);
        const response = await client.send(command);
        const data = {
            "recommendations": response.itemList
        }
        res.send(
            JSON.stringify(data)
        );
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Unable to get recommendations'});
    }
})