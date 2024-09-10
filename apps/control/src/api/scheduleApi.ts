import axios from 'axios';

const createApiClient = (baseURL: string) => {
  return axios.create({
    baseURL: baseURL,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};

const scheduleApiClient = createApiClient('http://localhost:8084');

const SCHM_API_BASE_URL = '/management/schedule';
const SCH_API_BASE_URL = '/schedule';

interface SchMParams {
  pageCode?: string;
  processCode?: string;
  rollUnit?: string;
  requestParams?: string;
}

export const fetchSchManagementData = async ({
  processCode,
  rollUnit,
}: SchMParams) => {
  try {
    const response = await scheduleApiClient.get(
      `${SCHM_API_BASE_URL}/${processCode}/${rollUnit}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Management-Schedule data');
  }
};

export const fetchScheduleData = async ({
  pageCode,
  processCode = 'schedule',
  requestParams = '',
}: SchMParams) => {
  try {
    const response = await scheduleApiClient.get(
      `${SCH_API_BASE_URL}/${pageCode}/${processCode}${requestParams}`,
    );
    console.log(
      `PATH URL : ${SCH_API_BASE_URL}/${pageCode}/${processCode}${requestParams}`,
      'RESPONSE DATA : ',
      response.data,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Schedule data');
  }
};
