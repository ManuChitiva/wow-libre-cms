import {
  createProviderApi,
  deleteProviderApi,
  getNotificationProvidersApi,
} from "@/api/notificationProviders";
import { NotificationProvidersResponse } from "@/dto/response/NotificationProviderResponse";
import { NotificationProviders } from "@/model/NotificationProviders";

const mapToNotificationProvider = (
  dto: NotificationProvidersResponse
): NotificationProviders => ({
  id: dto.id,
  name: dto.name,
  client: dto.client,
  host: dto.host,
  created_at: dto.created_at,
  updated_at: dto.updated_at,
  description: dto.description,
});

export const getNotificationProviders = async (
  token: string
): Promise<NotificationProviders[]> => {
  const responseDto = await getNotificationProvidersApi(token);
  return responseDto.map(mapToNotificationProvider);
};

export const deleteProvider = async (
  providerId: number,
  token: string
): Promise<void> => {
  await deleteProviderApi(providerId, token);
};

export const createProvider = async (
  name: string,
  host: string,
  client: string,
  secret: string,
  token: string
): Promise<void> => {
  await createProviderApi(name, host, client, secret, token);
};
