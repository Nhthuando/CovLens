import {z} from "zod";

export const authBodyValidate = z.object({
    email: z.string().email("Email phải hợp lệ!"),
    password: z.string().min(8,"Mật khẩu phải tối thiểu 8 kí tự")
})