import type { TApiUser } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TCreateUser, TUser } from "@/models";
export class UserServices {
  static async getAll(): Promise<TApiUser[]> {
    const res = await axiosInstance.get(`${BASE_URL}/user`);
    return res.data;
  }
  static async create(body: TCreateUser): Promise<TApiUser> {
    const res = await axiosInstance.post(`${BASE_URL}/user`, body);
    return res.data;
  }
  static async getById(id: string): Promise<TApiUser> {
    const res = await axiosInstance.get(`${BASE_URL}/user/${id}`);
    return res.data;
  }
  static async update(body: Partial<TUser>, id: string) {
    const res = await axiosInstance.patch(`${BASE_URL}/user/${id}`, body);
    return res.data;
  }
  static async delete() {}

  static async bulkCreate({
    users,
    id_rama,
  }: {
    users: Partial<Omit<TCreateUser, "username" | "password">>[];
    id_rama?: string;
  }): Promise<TApiUser[]> {
    let url = `${BASE_URL}/user/bulk`;
    if (id_rama) {
      url = `${BASE_URL}/user/bulk?id_rama=${id_rama}`;
    }
    const res = await axiosInstance.post(url, { users });
    return res.data;
  }

   static async getByRama(id_rama: string): Promise<TApiUser[]> {
    const res = await axiosInstance.get(`${BASE_URL}/user/by-rama/${id_rama}`);
    return res.data;
  }
}
