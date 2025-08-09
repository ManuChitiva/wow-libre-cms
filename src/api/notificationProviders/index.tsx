import { BASE_URL_CORE } from "@/configs/configs";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { NotificationProvidersResponse } from "@/dto/response/NotificationProviderResponse";
import { v4 as uuidv4 } from "uuid";

export const getNotificationProvidersApi = async (
  token: string
): Promise<NotificationProvidersResponse[]> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(`${BASE_URL_CORE}/api/provider`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        Authorization: "Bearer " + token,
      },
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<NotificationProvidersResponse[]> =
        await response.json();
      return responseData.data;
    } else {
      const genericResponse: GenericResponseDto<void> = await response.json();
      throw new InternalServerError(
        `${genericResponse.message}`,
        response.status,
        transactionId
      );
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else if (error instanceof InternalServerError) {
      throw error;
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        `Unknown error occurred - TransactionId: ${transactionId}`
      );
    }
  }
};

export const deleteProviderApi = async (
  providerId: number,
  token: string
): Promise<void> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL_CORE}/api/provider?provider_id=${providerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<void> = await response.json();
      return responseData.data;
    } else {
      const genericResponse: GenericResponseDto<void> = await response.json();
      throw new InternalServerError(
        `${genericResponse.message}`,
        response.status,
        transactionId
      );
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else if (error instanceof InternalServerError) {
      throw error;
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        `Unknown error occurred - TransactionId: ${transactionId}`
      );
    }
  }
};

export const createProviderApi = async (
  name: string,
  host: string,
  client: string,
  secret: string,
  token: string
): Promise<void> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(`${BASE_URL_CORE}/api/provider`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name,
        host,
        client,
        secret,
      }),
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<void> = await response.json();
      return responseData.data;
    } else {
      const genericResponse: GenericResponseDto<void> = await response.json();
      throw new InternalServerError(
        `${genericResponse.message}`,
        response.status,
        transactionId
      );
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(`Please try again later, services are not available.`);
    } else if (error instanceof InternalServerError) {
      throw error;
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        `Unknown error occurred - TransactionId: ${transactionId}`
      );
    }
  }
};
