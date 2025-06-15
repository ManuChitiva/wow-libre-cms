import { BASE_URL_CORE } from "@/configs/configs";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { VotingPlatforms } from "@/model/VotingPlatforms";
import { v4 as uuidv4 } from "uuid";

export const getPlatforms = async (
  token: string | null
): Promise<VotingPlatforms[]> => {
  const transactionId = uuidv4();

  const url = !token
    ? `${BASE_URL_CORE}/api/voting`
    : `${BASE_URL_CORE}/api/voting/logged`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    transaction_id: transactionId,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<VotingPlatforms[]> =
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

export const createPlatform = async (
  token: string,
  name: string,
  imgUrl: string,
  postbackUrl: string,
  allowedHost: string
): Promise<void> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(`${BASE_URL_CORE}/api/voting/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        img_url: imgUrl,
        allowed_host: allowedHost,
        postback_url: postbackUrl,
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

export const updatePlatform = async (
  token: string,
  id: number,
  name: string,
  imgUrl: string,
  postbackUrl: string,
  allowedHost: string
): Promise<void> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(`${BASE_URL_CORE}/api/voting/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        img_url: imgUrl,
        allowed_host: allowedHost,
        postback_url: postbackUrl,
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

export const deletePlatform = async (
  token: string,
  id: number
): Promise<void> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(`${BASE_URL_CORE}/api/voting/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        Authorization: `Bearer ${token}`,
      },
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
