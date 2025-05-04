import axios from 'axios';
import { ProductionReport } from './productionReportsModel';

export const fetchProductionReports = async (): Promise<ProductionReport[]> => {
  const response = await axios.get('http://localhost:4001/production-reports');
  return response.data;
};
