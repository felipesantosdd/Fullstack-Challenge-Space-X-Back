import { LauncherInterface } from "../schemas/Launcher";
import Launch from '../schemas/Launcher';
import notifier from "node-notifier"

class LauncherService {

    public async synchronize(): Promise<void> {
        const launches = await fetch('https://api.spacexdata.com/v5/launches');
        const launchesJson: LauncherInterface[] = await launches.json();

        await Launch.deleteMany({});

        launchesJson.forEach((launch: LauncherInterface) => Launch.create(launch));
        console.log('Dados de lançamentos obtidos com sucesso');
        

        notifier.notify({
            title: 'Notificação',
            message: 'Dados de lançamentos obtidos com sucesso!',
        });


        return
    }

    public async getRockets(): Promise<any> {
        const rockets = await fetch('https://api.spacexdata.com/v4/rockets');    
        const rocketsData = await rockets.json();
        return rocketsData
    }

    public async getAll(
        limit: number,
        page:number,
        searchQuery: string | undefined,
    ) {
       
        const skip = (page - 1) * limit;

        let query: any = {};

       
         if (searchQuery) {
             query = { name: { $regex: searchQuery, $options: 'i' } };
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

        const response = []
        launches.map((launch) => {
            response.push({
                rocket:  launch.rocket,
                sucess: launch.success,
                date: launch.date_local
            })
        })

        return response;
    }

}

export default new LauncherService()