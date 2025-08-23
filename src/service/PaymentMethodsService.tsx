import { getPaymentMethodsGateway } from "@/api/payment_methods";
import { PaymentMethodsGatewayReponse } from "@/dto/response/PaymentMethodsResponse";
import { PaymentMethod } from "@/model/PaymentMethod";

const mapToNotificationProvider = (
  dto: PaymentMethodsGatewayReponse
): PaymentMethod => ({
  id: dto.id,
  name: dto.name,
  payment_type: dto.payment_type,
  created_at: dto.created_at,
});

export const getPaymentMethodAvailable = async (
  token: string
): Promise<PaymentMethod[]> => {
  const responseDto = await getPaymentMethodsGateway(token);
  return responseDto.map(mapToNotificationProvider);
};
