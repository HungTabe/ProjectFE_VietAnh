import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      toast.error("Vui lòng nhập mật khẩu mới");
      return;
    }
    try {
      const response = await fetch("http://localhost:8081/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });
      if (response.ok) {
        toast.success("Đặt lại mật khẩu thành công!");
        setTimeout(() => {
          navigate("/auth/sign-in");
        }, 2000);
      } else {
        const errorData = await response.text();
        toast.error(errorData || "Có lỗi xảy ra khi đặt lại mật khẩu");
      }
    } catch (err) {
      toast.error("Lỗi kết nối đến server");
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Đặt Lại Mật Khẩu
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Nhập mật khẩu mới để đặt lại mật khẩu của bạn.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Mật Khẩu Mới
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Đặt Lại Mật Khẩu
          </Button>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default ResetPassword;