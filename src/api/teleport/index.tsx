import { BASE_URL_CORE } from "@/configs/configs";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { Teleport } from "@/model/Teleport";
import { v4 as uuidv4 } from "uuid";

export const getTeleports = async (
  raceId: number,
  token: string
): Promise<Teleport[]> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL_CORE}/api/teleport?raceId=${raceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<Teleport[]> =
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

export const teleport = async (
  token: string,
  accountId: number,
  characterId: number,
  realmId: number,
  teleportId: number
): Promise<Teleport[]> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(`${BASE_URL_CORE}/api/teleport/character`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        teleport_id: teleportId,
        character_id: characterId,
        account_id: accountId,
        realm_id: realmId,
      }),
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<Teleport[]> =
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
