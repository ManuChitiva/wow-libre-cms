import { BASE_URL_TRANSACTION } from "@/configs/configs";
import { GenericResponseDto, InternalServerError } from "@/dto/generic";
import { ProductCategoriesResponse } from "@/dto/response/ProductCategoriesResponse";
import { v4 as uuidv4 } from "uuid";

export const createCategory = async (
  token: string,
  name: string,
  description: string,
  disclaimer: string
): Promise<void> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL_TRANSACTION}/api/product-category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          disclaimer,
        }),
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

export const allCategories = async (
  token: string
): Promise<ProductCategoriesResponse[]> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL_TRANSACTION}/api/product-category`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<ProductCategoriesResponse[]> =
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
