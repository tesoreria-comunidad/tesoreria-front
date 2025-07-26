import type { TApiPerson } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TCreatePerson, TCreateUser } from "@/models";
export class PersonsServices {
  static async getAll(): Promise<TApiPerson[]> {
    const res = await axiosInstance.get(`${BASE_URL}/person`);
    return res.data;
  }
  static async create(body: TCreateUser): Promise<TApiPerson> {
    const res = await axiosInstance.post(`${BASE_URL}/person`, body);
    return res.data;
  }
  static async bulkCreate(body: TCreatePerson[]): Promise<TApiPerson[]> {
    const res = await axiosInstance.post(`${BASE_URL}/person/bulk`, body);
    return res.data;
  }
  static async getById() {}
  static async edit() {}
  static async delete() {}
}
