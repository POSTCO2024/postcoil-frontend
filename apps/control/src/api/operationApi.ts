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

const operationApiUrl = import.meta.env.VITE_OPERATION_API_URL;

export const operationApiClient = createApiClient(operationApiUrl!);

interface OpParams {
  pageCode?: string;
  processCode?: string;
  rollUnit?: string;
  requestParams?: string;
}

export const fetchOperationData = async ({
  processCode,
  rollUnit,
}: OpParams) => {
  try {
    const response = await operationApiClient.get(
      `${import.meta.env.VITE_MANAGEMENT_SCHEDULE_BASE_URL}/${processCode}/${rollUnit}`,
    ); // TODO: API style 수정
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
