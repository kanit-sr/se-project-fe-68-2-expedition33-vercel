import { UpdateCompanyResponse } from "../../interfaces";

export default async function updateCompany(
  id: string,
  token: string,
  formData: FormData
): Promise<UpdateCompanyResponse> {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as {
      msg?: string;
      message?: string;
    };
    throw new Error(body.msg ?? body.message ?? "Update failed");
  }

  return await response.json();
}
