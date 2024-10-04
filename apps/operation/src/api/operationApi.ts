import { ApiParams, createApiClient } from './apiClient';

export const operationApiUrl = import.meta.env.VITE_OPERATION_API_URL;
export const workInstructionBaseUrl = import.meta.env
  .VITE_WORK_INSTRUCTIONS_BASE_URL;

export const operationApiClient = createApiClient(operationApiUrl!);

export const fetchOperationData = async ({
  pageCode,
  processCode,
  requestParams = '',
}: ApiParams) => {
  try {
    const response = await operationApiClient.get(
      `${workInstructionBaseUrl}/${pageCode}?process=${processCode}${requestParams}`,
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
    throw new Error('Failed to fetch Management-Schedule data');
  }
};
