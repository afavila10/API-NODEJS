import express from 'express';
import profileRoutes from '../routes/profileRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import userStatusRoutes from '../routes/userStatusRoutes.js';
import roleRoutes from '../routes/roleRoutes.js';
import userApiRoutes from '../routes/apiUser.js';
import documentRoutes from '../routes/documentRoutes.js';

const app = express();
app.use(express.json());

app.use('/api_v1/', profileRoutes);
app.use('/api_v1/', userRoutes);
app.use('/api_v1/', userStatusRoutes);
app.use('/api_v1/', roleRoutes);
app.use('/api_v1/', userApiRoutes);
app.use('/api_v1/', documentRoutes);


app.use((rep, res, nex) =>{
    res.status(404).json({
        message: 'Not found'
    });
});

export default app;