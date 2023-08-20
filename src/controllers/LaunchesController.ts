import { Request, Response } from 'express';
import Launch from '../schemas/Launcher';
import { LauncherInterface } from '../schemas/Launcher';
import LauncherService from '../services/launchs.Service';

class LauncherController {
    public greetings(req: Request, res: Response): Response {
        return res.status(200).json({
            message: 'Fullstack Challenge 🏅 - Space X API'
        });
    }

    public async synchronize(req: Request, res: Response): Promise<Response | void> {
        try {
            await LauncherService.synchronize()

            return res.status(200).json({ message: 'Dados de lançamentos obtidos com sucesso.' });
        } catch (error) {
            if (res !== undefined) {
                return res.status(500).json({ error: 'Failed to create launcher.' });
            } else {
                return;
            }
        }
    }

    public async getAll(req: Request, res: Response): Promise<Response> {       
        try {
            const searchQuery = req.query.search as string | undefined;
            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 1;

            const response = await LauncherService.getAll(limit, page, searchQuery,)

            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve launches.' });
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            const user = await LauncherService.create(data)
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create launcher.' });
        }
    }

    public async getStats(req: Request, res: Response): Promise<Response> {
        try {           
            const stats = await LauncherService.getStats()
            return res.status(200).json(stats);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to get status.' });
        }
    }
}
export default new LauncherController();
