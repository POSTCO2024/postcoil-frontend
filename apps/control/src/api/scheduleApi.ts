import { ApiParams, createApiClient } from './apiClient';

export const scheduleApiUrl = import.meta.env.VITE_SCHEDULE_API_URL;
export const managementSchBaseUrl = import.meta.env
  .VITE_MANAGEMENT_SCHEDULE_BASE_URL;
export const scheduleBaseUrl = import.meta.env.VITE_SCHEDULE_BASE_URL;

export const scheduleApiClient = createApiClient(scheduleApiUrl!);

export const fetchSchManagementData = async ({
  processCode,
  rollUnit,
}: ApiParams) => {
  try {
    const response = await scheduleApiClient.get(
      `${managementSchBaseUrl}/${processCode}/${rollUnit}`,
    );
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
}: ApiParams) => {
  try {
    const response = await scheduleApiClient.get(
      `${scheduleBaseUrl}/${pageCode}/${processCode}${requestParams}`,
    );
    if (response.data && response.data.result) {
      console.log('fetchData: ', response.data.result);
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
