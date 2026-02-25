import axios from "axios";

const server_url = process.env.NEXT_PUBLIC_API_URL || "http://backendd:5000/api/v1";

const apiClient = axios.create({
  baseURL: server_url,
  headers: {
    "Content-Type": "application/json",
  },
});

interface OAuth2Payload {
  email: string;
  name: string;
  picture: string;
  provider: string;
  providerId: string;
}

export const oAuth2Verify = async (payload: OAuth2Payload) => {
  try {
    const response = await apiClient.post("/auth/oauth2", payload);
    return response.data;
  } catch (error) {
    console.error("OAuth2 verify failed:", error);
    throw new Error("OAuth2 verify failed");
  }
};
