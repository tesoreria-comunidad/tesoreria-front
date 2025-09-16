import type { TApiPerson } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TCreatePerson } from "@/models";
export class PersonsServices {
  static async getAll(): Promise<TApiPerson[]> {
    const res = await axiosInstance.get(`${BASE_URL}/person`);
    return res.data;
  }
  static async create(body: TCreatePerson): Promise<TApiPerson> {
    const res = await axiosInstance.post(`${BASE_URL}/person`, body);
    return res.data;
  }
  static async bulkCreate({
    persons,
    id_rama,
  }: {
    persons: TCreatePerson[];
    id_rama?: string;
  }): Promise<TApiPerson[]> {
    let url = `${BASE_URL}/person/bulk`;
    if (id_rama) {
      url = `${BASE_URL}/person/bulk?id_rama=${id_rama}`;
    }
    const res = await axiosInstance.post(url, { persons });
    return res.data;
  }
  static async getById() {}
  static async edit() {}
  static async delete() {}
}
