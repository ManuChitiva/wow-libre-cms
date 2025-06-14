import { BASE_URL_CORE, BASE_URL_TRANSACTION } from "@/configs/configs";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { Banners } from "@/model/banners";
import {
  PassAzerothData,
  PlansAcquisition,
  WidgetPillHome,
} from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const bannersHome = async (language: string): Promise<Banners[]> => {
  try {
    const transactionId = uuidv4();
    const response = await fetch(`${BASE_URL_CORE}/api/banners`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        "Accept-Language": language,
      },
    });

    const responseData: GenericResponseDto<Banners[]> = await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Error [${response.status}]: ${errorMessage}`);
    }
  } catch (error: any) {
    throw new Error(
      `It was not possible to obtain the images from the home: ${error.message}`
    );
  }
};

export const widgetSubscription = async (
  language: string
): Promise<PassAzerothData> => {
  try {
    const transactionId = uuidv4();
    const response = await fetch(`${BASE_URL_CORE}/api/resources/widget-home`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
        "Accept-Language": language,
      },
    });

    const responseData: GenericResponseDto<PassAzerothData> =
      await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Error [${response.status}]: ${errorMessage}`);
    }
  } catch (error: any) {
    throw new Error(
      `It was not possible to obtain the images from the home: ${error.message}`
    );
  }
};

export const widgetPillSubscription = async (
  language: string,
  token: string | null
): Promise<WidgetPillHome> => {
  try {
    const transactionId = uuidv4();
    let response;

    if (token === null) {
      response = await fetch(
        `${BASE_URL_TRANSACTION}/api/subscription/pill-home`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            transaction_id: transactionId,
            "Accept-Language": language,
          },
        }
      );
    } else {
      response = await fetch(
        `${BASE_URL_TRANSACTION}/api/subscription/pill-user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            transaction_id: transactionId,
            "Accept-Language": language,
            Authorization: "Bearer " + token,
          },
        }
      );
    }

    const responseData: GenericResponseDto<WidgetPillHome> =
      await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Error [${response.status}]: ${errorMessage}`);
    }
  } catch (error: any) {
    throw new Error(
      `It was not possible to obtain the images from the home: ${error.message}`
    );
  }
};

export const getPlanAcquisition = async (
  language: string
): Promise<PlansAcquisition[]> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL_CORE}/api/resources/plan-acquisition`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          "Accept-Language": language,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<PlansAcquisition[]> =
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
