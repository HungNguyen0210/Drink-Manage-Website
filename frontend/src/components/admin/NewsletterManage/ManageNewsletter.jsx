import { useEffect, useState } from "react";
import Loading from "../../website/Loading";
import axios from "axios";

const ManageNewsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [validCoupons, setValidCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const updateNewsletterCheckbox = async (id, checkbox) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/newsletters/${id}`,
        { checkbox },
      );
      if (response.data.success) {
        console.log("Cập nhật trạng thái checkbox thành công.");
      } else {
        console.error("Cập nhật trạng thái checkbox thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái checkbox:", error);
    }
  };

  const fetchValidCoupons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/coupons/valid-coupons",
      );
      if (response.data.success) {
        setValidCoupons(response.data.data);
      } else {
        console.log("Không có coupon hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy coupon:", error);
    }
  };

  useEffect(() => {
    fetchValidCoupons();
  }, []);

  // Hàm xử lý khi người dùng chọn coupon
  const handleCouponSelect = (event) => {
    setSelectedCoupon(event.target.value);
  };

  useEffect(() => {
    const fetchNewsletters = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/newsletters",
        );
        if (response.data.success) {
          setNewsletters(response.data.data);
        } else {
          console.error("Thất bại khi lấy thông tin");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);
  // Lọc danh sách theo email
  const filteredNewsletters = newsletters.filter((newsletter) =>
    newsletter.gmail.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Thay đổi trạng thái checkbox
  const handleCheckboxChange = async (_id) => {
    // Lấy newsletter hiện tại để thay đổi checkbox trong frontend
    const updatedNewsletter = newsletters.find(
      (newsletter) => newsletter._id === _id,
    );

    // Cập nhật checkbox trong frontend ngay lập tức
    setNewsletters((prevNewsletters) =>
      prevNewsletters.map((newsletter) =>
        newsletter._id === _id
          ? { ...newsletter, checkbox: !newsletter.checkbox }
          : newsletter,
      ),
    );

    // Gọi API để cập nhật trạng thái checkbox ở backend
    await updateNewsletterCheckbox(_id, !updatedNewsletter.checkbox);
  };
  const handleSendCoupon = async () => {
    // Lọc ra danh sách email đã chọn
    const selectedEmails = newsletters
      .filter((newsletter) => newsletter.checkbox)
      .map((newsletter) => newsletter.gmail);

    if (!selectedEmails.length) {
      alert("Vui lòng chọn ít nhất một email để gửi.");
      return;
    }

    if (!selectedCoupon) {
      alert("Vui lòng chọn mã coupon để gửi.");
      return;
    }

    try {
      // Gửi API với danh sách email và coupon đã chọn
      const response = await axios.post(
        "http://localhost:5000/api/coupons/send-coupon",
        {
          emails: selectedEmails, // Danh sách email
          couponCode: selectedCoupon, // Mã coupon
        },
      );

      if (response.data.success) {
        alert("Gửi coupon thành công!");

        // Xóa các email đã gửi thành công khỏi newsletter
        const deletePromises = newsletters
          .filter((newsletter) => newsletter.checkbox)
          .map((newsletter) =>
            axios.delete(
              `http://localhost:5000/api/newsletters/${newsletter._id}`,
            ),
          );

        await Promise.all(deletePromises);

        // Cập nhật danh sách newsletter trong frontend
        setNewsletters((prevNewsletters) =>
          prevNewsletters.filter(
            (newsletter) => !newsletter.checkbox, // Loại bỏ những email đã chọn
          ),
        );

        console.log("Đã xóa các email đã gửi khỏi danh sách.");
      } else {
        alert("Gửi coupon thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi coupon:", error);
      alert("Có lỗi xảy ra khi gửi coupon.");
    }
  };

  const handleSelectAll = async () => {
    if (allSelected) {
      // Hủy chọn tất cả
      try {
        // Cập nhật checkbox trong frontend ngay lập tức
        setNewsletters((prevNewsletters) =>
          prevNewsletters.map((newsletter) => ({
            ...newsletter,
            checkbox: false, // Hủy chọn
          })),
        );

        // Gửi API cập nhật trạng thái checkbox về backend
        const promises = newsletters.map((newsletter) =>
          axios.put(`http://localhost:5000/api/newsletters/${newsletter._id}`, {
            checkbox: false,
          }),
        );
        await Promise.all(promises);
        console.log("Hủy chọn tất cả thành công!");
      } catch (error) {
        console.error("Lỗi khi hủy chọn tất cả:", error);
      }
    } else {
      // Chọn tất cả
      try {
        // Cập nhật checkbox trong frontend ngay lập tức
        setNewsletters((prevNewsletters) =>
          prevNewsletters.map((newsletter) => ({
            ...newsletter,
            checkbox: true, // Chọn tất cả
          })),
        );

        // Gửi API cập nhật trạng thái checkbox về backend
        const promises = newsletters.map((newsletter) =>
          axios.put(`http://localhost:5000/api/newsletters/${newsletter._id}`, {
            checkbox: true,
          }),
        );
        await Promise.all(promises);
        console.log("Chọn tất cả thành công!");
      } catch (error) {
        console.error("Lỗi khi chọn tất cả:", error);
      }
    }
    setAllSelected(!allSelected); // Đổi trạng thái nút
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="h-[600px] w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        {/* Tìm kiếm người gửi mail */}
        <div className="mb-4 flex items-center justify-between">
          {/* Ô tìm kiếm */}
          <input
            type="text"
            placeholder="Tìm kiếm bằng email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72 rounded-md border border-gray-300 p-2"
          />

          {/* Nút "Chọn tất cả"/"Hủy" */}
          <button
            onClick={handleSelectAll}
            className={`rounded-md px-4 py-2 text-white ${
              allSelected
                ? "bg-red-600 hover:bg-red-500"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {allSelected ? "Hủy chọn" : "Chọn tất cả"}
          </button>
        </div>

        {loading ? (
          <div className="flex h-[255px] w-full items-center justify-center lg:h-[300px]">
            <Loading />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            {/* Tiêu đề bảng */}
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="w-1/3 px-4 py-3 text-center">Chọn</th>
                  <th className="w-2/3 px-4 py-3 text-left">Email</th>
                </tr>
              </thead>
            </table>

            {/* Nội dung cuộn */}
            <div className="max-h-[380px] overflow-y-auto">
              <table className="min-w-full table-auto">
                <tbody>
                  {filteredNewsletters.map((newsletter) => (
                    <tr key={newsletter._id} className="border-b">
                      <td className="w-1/3 px-4 py-6 text-center">
                        <input
                          type="checkbox"
                          checked={newsletter.checkbox}
                          onChange={() => handleCheckboxChange(newsletter._id)}
                          className="h-4 w-4"
                        />
                      </td>
                      <td className="w-2/3 px-4 py-6 font-bold">
                        {newsletter.gmail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="mb-4 flex items-center pt-6">
          <input
            type="text"
            placeholder="Nhập mã coupon mà bạn muốn gửi cho khách hàng"
            className="w-[400px] border border-gray-300 p-2"
            list="coupon-list" // Liên kết với datalist
            value={selectedCoupon} // Giá trị input sẽ được liên kết với state
            onChange={handleCouponSelect}
          />
          <button
            className="ml-4 bg-black px-8 py-2 text-white"
            onClick={handleSendCoupon}
          >
            Gửi
          </button>

          {/* Datalist chứa danh sách các coupon */}
          <datalist id="coupon-list">
            {validCoupons.map((coupon) => (
              <option key={coupon._id} value={coupon.code}>
                {coupon.code} - Giảm {coupon.discountValue.toLocaleString()}đ
              </option>
            ))}
          </datalist>
        </div>
      </div>
    </div>
  );
};

export default ManageNewsletter;
