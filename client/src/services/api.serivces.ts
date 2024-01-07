import { DataItem } from '@/types';
import ApiService from '@services/http-common';

export async function saveTranscribeData(data: DataItem) {
  const response = await ApiService.post('/store-text', data);
  return response.data;
}

export async function getTranscribedHistory() {
  const response = await ApiService.get('/store-text');
  return response.data;
}
