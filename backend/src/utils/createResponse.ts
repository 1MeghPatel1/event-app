export const createResponse = (
  success: boolean = true,
  status: number,
  message: string,
  data?: any,
) => {
  return {
    success,
    status,
    message,
    data,
  };
};
