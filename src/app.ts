import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes/launches.Routes'
import cron from 'node-cron'
import LaunchesController from './controllers/LaunchesController'

class App {
    public express: express.Application


    public constructor() {
        this.express = express();
        this.setup();
        this.routes();
        this.scheduleCron();
    }

    private setup(): void {
        this.setupMiddlewares();
        this.setupDatabase();
    }

    private setupMiddlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private setupDatabase(): void {
        const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/spaceX';
        mongoose.connect(dbURL)
            .then(() => {
                console.log('Connected to database');
            })
            .catch((error) => {
                console.error('Database connection error:', error);
            });
    }

    private routes(): void {
        this.express.use(routes)
    }

    private scheduleCron(): void {
        cron.schedule('* * * * *', () => {
            LaunchesController.synchronize();
        });
    }

}


export default new App().express