import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/bmi', (req: Request, res: Response): void => {

    const { height, weight } = req.query;

    // Convert height and weight to numbers
    const heightInCm = parseFloat(height as string);
    const weightInKg = parseFloat(weight as string);

    if (isNaN(heightInCm) || isNaN(weightInKg)) {
        res.status(400).json({
            error: "malformatted parameters"
        });
        return;
    }

    calculateBmi(heightInCm, weightInKg)

    res.json({
        'weight': weightInKg,
        'height': heightInCm,
        'bmi': calculateBmi(heightInCm, weightInKg)
    });
})

app.get('/ping', (_req, res) => {
    res.send('pong');
})

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})