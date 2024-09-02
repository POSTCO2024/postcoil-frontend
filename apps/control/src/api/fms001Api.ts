import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8084'; // API URL

interface SchMParams {
  processCode: string;
  materialUnitCode: string;
}

const SCHM_API_BASE_URL = '/management/schedule';

export const fetchSchManagementData = async (params: SchMParams) => {
  try {
    const response = await axios.get(
      `${SCHM_API_BASE_URL}/${params.processCode}/${params.materialUnitCode}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch SchManagement data');
  }
};
