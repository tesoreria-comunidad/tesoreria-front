import type { TApiUser } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TCreateUser, TUpdateUser } from "@/models";
export class UserServices {
  static async getAll(): Promise<TApiUser[]> {
    const res = await axiosInstance.get(`${BASE_URL}/user`);
    return res.data;
  }
  static async create(body: TCreateUser): Promise<TApiUser> {
    const res = await axiosInstance.post(`${BASE_URL}/user`, body);
    return res.data;
  }
  static async getById() {}
  static async delete() {}

  static async updateUser(id: string, data: TUpdateUser) {
    const res = await axiosInstance.patch(`${BASE_URL}/user/${id}`, data);
    return res.data;
  }

  static async bulkCreate({
    users,
    id_rama,
  }: {
    users: TCreateUser[];
    id_rama?: string;
  }): Promise<TApiUser[]> {
    let url = `${BASE_URL}/user/bulk`;
    if (id_rama) {
      url = `${BASE_URL}/user/bulk?id_rama=${id_rama}`;
    }
    const res = await axiosInstance.post(url, { users });
    return res.data;
  }
}
