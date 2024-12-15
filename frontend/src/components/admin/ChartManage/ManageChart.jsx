import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const placeholderOrders = [
  {
    id: "1",
    name: "Nguyen Van A",
    address: "123 Đường ABC, Quận 1, TP. HCM",
    number: "0987654321",
    email: "nguyenvana@example.com",
    note: "Giao vào buổi tối",
    paymentMethod: "COD",
    cart: [
      {
        product: {
          image: "imgfood3",
          name: "Sản phẩm 7",
          sell_price: 100000,
        },
        quantity: 20,
        totalPrice: 200000,
      },
      {
        product: {
          image: "imgfood4",
          name: "Sản phẩm 2",
          sell_price: 150000,
        },
        quantity: 3,
        totalPrice: 450000,
      },
    ],
    orderDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Tran Thi B",
    address: "456 Đường XYZ, Quận 2, TP. HCM",
    number: "0123456789",
    email: "tranthib@example.com",
    note: "Giao vào sáng mai",
    paymentMethod: "Online Payment",
    cart: [
      {
        product: {
          image: "imgfood1",
          name: "Sản phẩm 3",
          sell_price: 200000,
        },
        quantity: 1,
        totalPrice: 200000,
      },
      {
        product: {
          image: "imgfood2",
          name: "Sản phẩm 4",
          sell_price: 300000,
        },
        quantity: 2,
        totalPrice: 600000,
      },
      {
        product: {
          image: "imgfood3",
          name: "Sản phẩm 7",
          sell_price: 100000,
        },
        quantity: 20,
        totalPrice: 200000,
      },
    ],
    orderDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Tran Thi C",
    address: "456 Đường XYZ, Quận 2, TP. HCM",
    number: "0123456789",
    email: "tranthicd@example.com",
    note: "Giao vào sáng mai",
    paymentMethod: "Online Payment",
    cart: [
      {
        product: {
          image: "imgfood5",
          name: "Sản phẩm 5",
          sell_price: 200000,
        },
        quantity: 4,
        totalPrice: 800000,
      },
      {
        product: {
          image: "imgfood3",
          name: "Sản phẩm 28",
          sell_price: 100000,
        },
        quantity: 20,
        totalPrice: 200000,
      },
      {
        product: {
          image: "imgfood6",
          name: "Sản phẩm 6",
          sell_price: 300000,
        },
        quantity: 2,
        totalPrice: 600000,
      },
    ],
    orderDate: "2024-03-12",
  },
  {
    id: "4",
    name: "Le Thi D",
    address: "789 Đường 123, Quận 3, TP. HCM",
    number: "0988123456",
    email: "lethid@example.com",
    note: "Giao vào chiều tối",
    paymentMethod: "COD",
    cart: [
      {
        product: {
          image: "imgfood7",
          name: "Sản phẩm 7",
          sell_price: 400000,
        },
        quantity: 3,
        totalPrice: 1200000,
      },
      {
        product: {
          image: "imgfood8",
          name: "Sản phẩm 8",
          sell_price: 250000,
        },
        quantity: 2,
        totalPrice: 500000,
      },
      {
        product: {
          image: "imgfood3",
          name: "Sản phẩm 11",
          sell_price: 100000,
        },
        quantity: 10,
        totalPrice: 200000,
      },
    ],
    orderDate: "2024-02-28",
  },
  {
    id: "5",
    name: "Pham Minh E",
    address: "101 Đường ABC, Quận 4, TP. HCM",
    number: "0987654321",
    email: "phamminhe@example.com",
    note: "Giao vào sáng mai",
    paymentMethod: "Online Payment",
    cart: [
      {
        product: {
          image: "imgfood9",
          name: "Sản phẩm 9",
          sell_price: 350000,
        },
        quantity: 5,
        totalPrice: 1750000,
      },
      {
        product: {
          image: "imgfood10",
          name: "Sản phẩm 10",
          sell_price: 450000,
        },
        quantity: 2,
        totalPrice: 900000,
      },
      {
        product: {
          image: "imgfood3",
          name: "Sản phẩm 11",
          sell_price: 100000,
        },
        quantity: 30,
        totalPrice: 200000,
      },
      {
        product: {
          image: "imgfood3",
          name: "Sản phẩm 19",
          sell_price: 100000,
        },
        quantity: 20,
        totalPrice: 200000,
      },
    ],
    orderDate: "2024-04-05",
  },
  {
    id: "6",
    name: "Nguyen Thi F",
    address: "102 Đường XYZ, Quận 5, TP. HCM",
    number: "0987654322",
    email: "nguyenthif@example.com",
    note: "Giao vào cuối tuần",
    paymentMethod: "COD",
    cart: [
      {
        product: {
          image: "imgfood11",
          name: "Sản phẩm 11",
          sell_price: 120000,
        },
        quantity: 6,
        totalPrice: 720000,
      },
      {
        product: {
          image: "imgfood12",
          name: "Sản phẩm 12",
          sell_price: 220000,
        },
        quantity: 4,
        totalPrice: 880000,
      },
    ],
    orderDate: "2024-05-10",
  },
  {
    id: "7",
    name: "Pham Thi G",
    address: "303 Đường 456, Quận 6, TP. HCM",
    number: "0987654323",
    email: "phamthig@example.com",
    note: "Giao vào buổi sáng",
    paymentMethod: "Online Payment",
    cart: [
      {
        product: {
          image: "imgfood13",
          name: "Sản phẩm 13",
          sell_price: 500000,
        },
        quantity: 2,
        totalPrice: 1000000,
      },
      {
        product: {
          image: "imgfood14",
          name: "Sản phẩm 14",
          sell_price: 600000,
        },
        quantity: 3,
        totalPrice: 1800000,
      },
    ],
    orderDate: "2024-06-20",
  },
  {
    id: "8",
    name: "Pham Thi E",
    address: "404 Đường 789, Quận 7, TP. HCM",
    number: "0987654324",
    email: "leminhh@example.com",
    note: "Giao vào sáng mai",
    paymentMethod: "COD",
    cart: [
      {
        product: {
          image: "imgfood15",
          name: "Sản phẩm 15",
          sell_price: 350000,
        },
        quantity: 2,
        totalPrice: 700000,
      },
      {
        product: {
          image: "imgfood16",
          name: "Sản phẩm 16",
          sell_price: 550000,
        },
        quantity: 2,
        totalPrice: 1100000,
      },
    ],
    orderDate: "2024-07-15",
  },
  {
    id: "9",
    name: "Nguyen Thi I",
    address: "505 Đường 012, Quận 8, TP. HCM",
    number: "0987654325",
    email: "nguyenthii@example.com",
    note: "Giao vào buổi chiều",
    paymentMethod: "Online Payment",
    cart: [
      {
        product: {
          image: "imgfood17",
          name: "Sản phẩm 17",
          sell_price: 420000,
        },
        quantity: 3,
        totalPrice: 1260000,
      },
      {
        product: {
          image: "imgfood18",
          name: "Sản phẩm 18",
          sell_price: 350000,
        },
        quantity: 2,
        totalPrice: 700000,
      },
    ],
    orderDate: "2024-12-15",
  },
  {
    id: "10",
    name: "Le Thi K",
    address: "213 Đường 456, Quận 9, TP. HCM",
    number: "0987654326",
    email: "lethik@example.com",
    note: "Giao vào sáng sớm",
    paymentMethod: "Online Payment",
    cart: [
      {
        product: {
          image: "imgfood19",
          name: "Sản phẩm 19",
          sell_price: 250000,
        },
        quantity: 6,
        totalPrice: 1500000,
      },
    ],
    orderDate: "2024-12-14",
  },
  {
    id: "10",
    name: "Le Thi KL",
    address: "213 Đường 456, Quận 9, TP. HCM",
    number: "0987654326",
    email: "lethik@example.com",
    note: "Giao vào sáng sớm",
    paymentMethod: "Online Payment",
    cart: [
      {
        product: {
          image: "imgfood19",
          name: "Sản phẩm 19",
          sell_price: 250000,
        },
        quantity: 6,
        totalPrice: 1500000,
      },
    ],
    orderDate: "2024-9-14",
  },
];

const ManageChart = () => {
  // Calculate yesterday's date for default pie chart filter
  const getYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Set date to one day before
    yesterday.setHours(0, 0, 0, 0); // Set time to 00:00 to normalize the date
    return yesterday;
  };

  const [timeRange, setTimeRange] = useState("month");
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [{ label: "Doanh thu", data: [] }],
  });

  const [pieStartDate, setPieStartDate] = useState(getYesterday()); // Default to yesterday
  const [pieEndDate, setPieEndDate] = useState(getYesterday()); // Default to yesterday
  const [filteredPieOrders, setFilteredPieOrders] = useState(placeholderOrders);

  // Hàm lấy doanh thu theo thời gian (week, month, year)
  const getRevenueByTime = (timeRange) => {
    const revenueByTime = {
      week: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        data: new Array(7).fill(0),
      },
      month: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        data: new Array(4).fill(0),
      },
      year: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        data: new Array(12).fill(0),
      },
    };

    placeholderOrders.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      const orderRevenue = order.cart.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );

      if (timeRange === "week") {
        const dayOfWeek = orderDate.getDay();
        revenueByTime.week.data[dayOfWeek] += orderRevenue;
      }

      if (timeRange === "month") {
        const weekOfMonth = Math.floor(orderDate.getDate() / 7);
        revenueByTime.month.data[weekOfMonth] += orderRevenue;
      }

      if (timeRange === "year") {
        const month = orderDate.getMonth();
        revenueByTime.year.data[month] += orderRevenue;
      }
    });

    return revenueByTime[timeRange];
  };

  useEffect(() => {
    const filtered = placeholderOrders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      // Normalize the dates by setting the time to midnight to avoid issues with time comparison
      const normalizedStartDate = new Date(pieStartDate.setHours(0, 0, 0, 0));
      const normalizedEndDate = new Date(pieEndDate.setHours(23, 59, 59, 999));

      return orderDate >= normalizedStartDate && orderDate <= normalizedEndDate;
    });

    const sortedOrders = filtered
      .map((order) => ({
        ...order,
        totalOrderValue: order.cart.reduce(
          (sum, item) => sum + item.totalPrice,
          0,
        ),
      }))
      .sort((a, b) => b.totalOrderValue - a.totalOrderValue) // Sort by total order value in descending order
      .slice(0, 5); // Take the top 5 customers

    setFilteredPieOrders(sortedOrders);
  }, [pieStartDate, pieEndDate]);

  const pieChartData = {
    labels: filteredPieOrders.map((order) => order.name),
    datasets: [
      {
        label: "Total Order Value",
        data: filteredPieOrders.map((order) => order.totalOrderValue),
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Cập nhật các biểu đồ khi thời gian thay đổi
  useEffect(() => {
    const revenue = getRevenueByTime(timeRange);
    setRevenueData({
      labels: revenue.labels,
      datasets: [
        {
          label: "Doanh thu",
          data: revenue.data,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 3,
        },
      ],
    });
  }, [timeRange]);

  return (
    <div className="bg-gray-50 p-6">
      <h1 className="border-b-[3px] border-black pb-8 text-center text-4xl font-bold">
        Quản lý Biểu đồ
      </h1>

      {/* Biểu đồ Doanh thu */}
      <div className="mb-4 mt-8">
        <h2 className="text-center font-josefin text-4xl font-bold">
          Doanh thu cửa hàng
        </h2>
        <label htmlFor="timeRange" className="font-josefin text-2xl font-bold">
          Chọn Thời gian:
        </label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="ml-2 rounded-md border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Tuần</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>

      {/* Line Chart - Adjust height and margin */}
      <div className="mb-16 w-11/12">
        <Line data={revenueData} />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 font-josefin text-4xl font-bold">
            Top 5 Khách Hàng
          </h2>
          <div className="mb-4 flex justify-center">
            <label className="mr-2 mt-2 font-josefin text-xl font-bold">
              Lọc Từ Ngày:{" "}
            </label>
            <DatePicker
              selected={pieStartDate}
              onChange={(date) => setPieStartDate(date)}
              className="border border-gray-300 p-2 text-center"
            />
            <span className="mx-6 mt-2 font-josefin text-xl font-bold">
              Đến Ngày:
            </span>
            <DatePicker
              selected={pieEndDate}
              onChange={(date) => setPieEndDate(date)}
              className="border border-gray-300 p-2 text-center"
            />
          </div>
        </div>

        {/* Pie Chart - Adjust height and margin */}
        <div className="mb-6 mt-4 w-full md:w-2/5">
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default ManageChart;
``;
