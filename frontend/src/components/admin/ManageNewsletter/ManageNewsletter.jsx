import { useState } from "react";
import Loading from "../../website/Loading";

const ManageNewsletter = () => {
  // Dữ liệu tĩnh mẫu
  const placeholderData = [
    {
      id: 1,
      email: "user1@example.com",
      content: "Lorem ipsum 1",
      checkbox: false,
      status: true,
    },
    {
      id: 2,
      email: "user2@example.com",
      content: "Lorem ipsum 2",
      checkbox: false,
      status: false,
    },
    {
      id: 3,
      email: "user3@example.com",
      content: "Lorem ipsum 3",
      checkbox: true,
      status: true,
    },
    {
      id: 4,
      email: "user4@example.com",
      content: "Lorem ipsum 4",
      checkbox: false,
      status: false,
    },
    {
      id: 5,
      email: "user4@example.com",
      content: "Lorem ipsum 4",
      checkbox: false,
      status: false,
    },
    {
      id: 6,
      email: "user4@example.com",
      content: "Lorem ipsum 4",
      checkbox: false,
      status: false,
    },
    {
      id: 7,
      email: "user4@example.com",
      content: "Lorem ipsum 4",
      checkbox: false,
      status: false,
    },
  ];

  const [newsletters, setNewsletters] = useState(placeholderData);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Lọc danh sách theo email
  const filteredNewsletters = newsletters.filter((newsletter) =>
    newsletter.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Thay đổi trạng thái checkbox
  const handleCheckboxChange = (id) => {
    setNewsletters((prevNewsletters) =>
      prevNewsletters.map((newsletter) =>
        newsletter.id === id
          ? { ...newsletter, checkbox: !newsletter.checkbox }
          : newsletter,
      ),
    );
  };

  // Thay đổi trạng thái status
  const toggleStatus = (id) => {
    setNewsletters((prevNewsletters) =>
      prevNewsletters.map((newsletter) =>
        newsletter.id === id
          ? { ...newsletter, status: !newsletter.status }
          : newsletter,
      ),
    );
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="h-[600px] w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        {/* Tìm kiếm người gửi mail */}
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Tìm kiếm bằng email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72 rounded-md border border-gray-300 p-2"
          />
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
                    <tr key={newsletter.id} className="border-b">
                      <td className="w-1/3 px-4 py-6 text-center">
                        <input
                          type="checkbox"
                          checked={newsletter.checkbox}
                          onChange={() => handleCheckboxChange(newsletter.id)}
                          className="h-6 w-6"
                        />
                      </td>
                      <td className="w-2/3 px-4 py-6 font-bold">
                        {newsletter.email}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[400px] border border-gray-300 p-2"
          />
          <button
            className="ml-4 bg-black px-8 py-2 text-white "
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageNewsletter;
