import { axiosInstance, BASE_URL } from "@/config/axios.config";

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export interface AgentChart {
  type: "bar" | "line" | "pie";
  title: string;
  data: { name: string; value: number }[];
}

export interface AgentChatResponse {
  text: string;
  chart: AgentChart | null;
  remainingQueries: number;
}

export class AgentService {
  static async chat(
    message: string,
    history: ChatHistoryItem[]
  ): Promise<AgentChatResponse> {
    const res = await axiosInstance.post(`${BASE_URL}/agent/chat`, {
      message,
      history,
    });
    return res.data;
  }
}
