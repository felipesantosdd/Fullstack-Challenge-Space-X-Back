import { LauncherInterface } from "../schemas/Launcher";
import Launch from '../schemas/Launcher';
import { Request } from 'express';

class LauncherService {
    public async synchronize(): Promise<void> {
        const launches = await fetch('https://api.spacexdata.com/v5/launches');
        const launchesJson: LauncherInterface[] = await launches.json();

        await Launch.deleteMany({});

        launchesJson.forEach((launch: LauncherInterface) => Launch.create(launch));
        console.log('Dados de lançamentos obtidos com sucesso');
    }

    public async getAll(
        limit: number,
        page:number,
        searchQuery: string | undefined,
    ) {
       
        const skip = (page - 1) * limit;

        let query: any = {};
       
         if (searchQuery) {
             query = { $name: { $search: searchQuery } };
             console.log(query.$text.$search);
         }

        const totalDocs = await Launch.countDocuments(query);

        const totalPages = Math.ceil(totalDocs / limit);

        const launches = await Launch.find(query)
            .skip(skip)
            .limit(limit);

        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        const response = {
            results: launches,
            totalDocs,
            page,
            totalPages,
            hasNext,
            hasPrev
        };

        return response;
    }

    public async create(body) {
        const user = await Launch.create(body);
        return user
    }

    public async getStats() {
        const launches = await Launch.find();

        let successCount = 0;
        let failureCount = 0;
        const launchCounts: Record<string, number> = {}

        for (const launch of launches) {
            if (launch.success) {
                successCount++;
            } else {
                failureCount++;
            }

            if (launch.rocket in launchCounts) {
                launchCounts[launch.rocket]++;
            } else {
                launchCounts[launch.rocket] = 1;
            }
        }

        const rockets = Object.keys(launchCounts).map((rocket) => ({
            id: rocket,
            launchs: launchCounts[rocket],
        }));


        const stats = {
            success: successCount,
            failure: failureCount,
            launchCounts: rockets,
        };

        return stats;
    }

    
}

export default new LauncherService()