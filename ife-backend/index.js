const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json({limit: '50mb'}));

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

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

// const filedir='/Users/ssuntoso/GitHub/Cathay2024/ife-backend';
const filedir='/app/data';

app.post('/ife/recommendation/:seatId', async (req, res) => {
    try {
        const seatId = req.params.seatId;
        const filename = `${seatId}.json`;
        const filepath = path.join(filedir, filename);
        
        await fs.writeFile(filepath, JSON.stringify(req.body, null, 2));
        
        res.status(200).json({
            message: 'Data stored successfully',
            filename: filename
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to store data',
            details: error.message
        });
    }
});

app.get('/ife/recommendation/:seatId', async (req, res) => {
    try {
        const seatId = req.params.seatId;
        const filename = `${seatId}.json`;
        const filepath = path.join(filedir, filename);
        try {
            await fs.access(filepath);
        } catch (error) {
            res.status(404).json({
                error: 'Data not found',
                details: error.message
            });
            return;
        }
        const data = await fs.readFile(filepath, 'utf8');
        await fs.unlink(filepath);
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to get data',
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});