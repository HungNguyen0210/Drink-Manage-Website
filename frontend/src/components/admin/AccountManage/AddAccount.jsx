import { useState } from "react";

const AddAccount = ({ onAddAccount, onClose }) => {
  const [newAccount, setNewAccount] = useState({
    username: "",
    password: "",
    gmail: "",
    numbers: "",
    role: "customer", // Mặc định là "customer"
  });

  const [errors, setErrors] = useState({}); // Trạng thái lưu lỗi từ API

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "numbers") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Loại bỏ ký tự không phải số
      setNewAccount({ ...newAccount, [name]: numericValue });
    } else {
      setNewAccount({ ...newAccount, [name]: value });
    }
    setErrors({ ...errors, [name]: "" }); // Xóa lỗi của trường đang chỉnh sửa
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset lỗi trước khi gửi
    setErrors({});

    if (
      !newAccount.username ||
      !newAccount.password ||
      !newAccount.gmail ||
      !newAccount.numbers ||
      !newAccount.role
    ) {
      setErrors({ form: "Vui lòng điền đầy đủ thông tin" });
      return;
    }

    try {
      const date = new Date().toLocaleDateString("en-GB"); // Format: DD-MM-YYYY
      const response = await onAddAccount({
        ...newAccount,
        createAt: date,
        updateAt: date,
      });

      if (response.success) {
        onClose(); // Đóng form nếu thành công
      } else {
        setErrors({ form: response.message }); // Hiển thị lỗi API
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setErrors({ form: "Có lỗi xảy ra khi tạo tài khoản" });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 flex justify-center text-4xl font-bold">Tạo tài khoản</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block pb-2 text-xl font-medium">Tên tài khoản</label>
            <input
              type="text"
              name="username"
              value={newAccount.username}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label className="block pb-2 text-xl font-medium">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={newAccount.password}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block pb-2 text-xl font-medium">Gmail</label>
            <input
              type="email"
              name="gmail"
              value={newAccount.gmail}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
            />
            {errors.gmail && <p className="text-red-500">{errors.gmail}</p>}
          </div>
          <div className="mb-4">
            <label className="block pb-2 text-xl font-medium">Số điện thoại</label>
            <input
              type="text"
              name="numbers"
              value={newAccount.numbers}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block pb-2 text-xl font-medium">Vai trò</label>
            <select
              name="role"
              value={newAccount.role}
              onChange={handleInputChange}
              className="w-1/2 rounded-md border border-gray-300 p-2"
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          {errors.form && <p className="text-red-500">{errors.form}</p>} {/* Hiển thị lỗi chung */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md w-24 bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Tạo tài khoản
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;
