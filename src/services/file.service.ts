import { axiosInstance, BASE_URL } from "@/config/axios.config";
export class FileServices {
  static async upload({ family_id, file }: { file: File; family_id: string }) {
    const formData = new FormData();
    formData.append("file", file); // El archivo a subir
    formData.append("family_id", family_id); // Campo extra
    const res = await axiosInstance.post(`${BASE_URL}/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
  static async create() {}
  static async getById() {}
  static async edit() {}
  static async delete() {}
}
