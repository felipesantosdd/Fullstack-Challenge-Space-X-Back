import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes/launches.Routes'
import cron from 'node-cron'
import LaunchesController from './controllers/LaunchesController'
import LauncherService from './services/launchs.Service'
import dotenv from 'dotenv'


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
        dotenv.config();
        const { DB_HOST, DB_PORT, DB_NAME } = process.env
        mongoose.connect(
            `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
        )
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
        cron.schedule('0 9 * * *', () => {
            LauncherService.synchronize();
        });
    }

}


export default new App().express