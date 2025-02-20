import express from 'express';
import movieRoutes from './routes';

const app = express();

app.use(express.json());

app.use('/api', movieRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})