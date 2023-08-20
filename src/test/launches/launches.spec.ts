import { Request, request } from "express";
import LauncherService from "../../services/launchs.Service";
import mongoose from "mongoose";

describe("Get All Launch", () => {

    beforeAll(() => {
        const dbURL =  'mongodb://localhost:27017/spaceX';
        mongoose.connect(dbURL)
            .then(() => {
                console.log('Connected to database');
            })
            .catch((error) => {
                console.error('Database connection error:', error);
            });
    })

    afterAll(async () => {
        await mongoose.disconnect();
        console.log('Disconnected from database');
    });
    
    
    test("Testa se a lista de Lançamentos está sendo retornada corretamente", async () => {
        const response = await LauncherService.getAll(10, 1, '');

        expect(response.results.length).toBeGreaterThan(0);

        const firstLaunch = response.results[0];
        expect(firstLaunch).toEqual(expect.objectContaining({
            fairings: expect.any(Object)
        }));
    }, 50000);

    test("Testa se a quantidade de objetos é a quantidade solicitada", 
        async () => {
            const results = 10
            const response = await LauncherService.getAll(results, 1, '');
            expect(response.results.length).toEqual(results)
        }
    )

    it('Verifica se é possivel buscar uma pagina especifica', async () => {
        const page = 10
        const response = await LauncherService.getAll(10, page, '')
        expect(response.page).toEqual(page)
    })


    it('Verifica se é possivel buscar um lançamento especifico', async () => {
        const busca = 'tesla'
        const response = await LauncherService.getAll(10, 10, 'tesla')
        expect(response.page).toEqual(busca)
    })

    it('Verifica se é possivel buscar os status de lançamentos', async () => {
        const response = await LauncherService.getStats()
        expect(response).toHaveProperty("success", expect.any(Number));
        expect(response).toHaveProperty("failure", expect.any(Number));
        expect(response).toHaveProperty("launchCounts", expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String),
                launchs: expect.any(Number)
            }),
        ]));
    })


});
