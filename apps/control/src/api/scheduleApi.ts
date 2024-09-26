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

const scheduleApiUrl = import.meta.env.VITE_SCHEDULE_API_URL;
console.log(scheduleApiUrl);

export const scheduleApiClient = createApiClient(scheduleApiUrl!);

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
      `${import.meta.env.VITE_SCHEDULE_MANAGEMENT_BASE_URL}/${processCode}/${rollUnit}`,
    );
    // response.data와 response.data.result가 존재하는지 확인
    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error: any) {
    console.error(
      'Error fetching data:',
      error.response ? error.response.data : error.message,
    );
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
      `${import.meta.env.VITE_SCHEDULE_BASE_URL}/${pageCode}/${processCode}${requestParams}`,
    );
    // response.data와 response.data.result가 존재하는지 확인
    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error: any) {
    console.error(
      'Error fetching data:',
      error.response ? error.response.data : error.message,
    );
    throw new Error('Failed to fetch Schedule data');
  }
};
