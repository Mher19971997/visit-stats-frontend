import { $host } from '@/visit_stats_frontend/http/index';
import { CountriesAnalyticCatchOutPut, CountriesAnalyticOutput } from '../types/countries';

const getCountriesAnaliticsByTimestpes = async (query: any): Promise<CountriesAnalyticOutput[]> => {
    const { data } = await $host.get(`/api/v1/countries_analytics?${query}`);
    return data;
};

const getCountriesAnaliticsByCatch = async (query: any): Promise<CountriesAnalyticCatchOutPut[]> => {
    const { data } = await $host.get(`/api/v1/countries_analytics/catch?${query}`);
    return data;
};

export { getCountriesAnaliticsByCatch, getCountriesAnaliticsByTimestpes };
