import { CompanyItem } from "../../interfaces";
import { getCompanyById } from "@/mocks/mockStore";

export default async function getCompany(id: string): Promise<CompanyItem>{
    if (process.env.USE_MOCK_API === "true") {
        return getCompanyById(id);
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${id}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch company");
    }

    return (await response.json()).data;
}