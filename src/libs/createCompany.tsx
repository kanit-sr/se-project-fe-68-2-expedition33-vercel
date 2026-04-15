import { CompanyItem } from "../../interfaces";

export default async function createCompany(
  token: string,
  formData: FormData
): Promise<{ success: boolean; data: CompanyItem }> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/companies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as {
      msg?: string;
      message?: string;
    };
    throw new Error(body.msg ?? body.message ?? "Failed to create company");
  }

  return res.json();
}