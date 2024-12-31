import { useEffect, useState } from "react";
import Loading from "../../website/Loading";
import axios from "axios";

const ManageNewsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

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
  const handleCheckboxChange = (_id) => {
    setNewsletters((prevNewsletters) =>
      prevNewsletters.map((newsletter) =>
        newsletter._id === _id
          ? { ...newsletter, checkbox: !newsletter.checkbox }
          : newsletter,
      ),
    );
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
            onClick={() => {
              if (allSelected) {
                // Hủy chọn tất cả
                setNewsletters((prevNewsletters) =>
                  prevNewsletters.map((newsletter) => ({
                    ...newsletter,
                    checkbox: false, // Hủy chọn
                  })),
                );
              } else {
                // Chọn tất cả
                setNewsletters((prevNewsletters) =>
                  prevNewsletters.map((newsletter) => ({
                    ...newsletter,
                    checkbox: true, // Chọn tất cả
                  })),
                );
              }
              setAllSelected(!allSelected); // Đổi trạng thái nút
            }}
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
          />
          <button className="ml-4 bg-black px-8 py-2 text-white">Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default ManageNewsletter;
