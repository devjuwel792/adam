"use client";

import { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { FaCheck, FaDollarSign, FaDownload, FaUserPlus } from "react-icons/fa6";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsDashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: "Last 7 days",
    jobType: "All Job Types",
    businessName: "All",
  });

  // Dynamic data that updates based on filters
  const [dashboardData, setDashboardData] = useState({
    jobsCompleted: 12,
    newSignups: 5,
    revenue: 89247,
    jobCompletionTrend: [200, 250, 300, 350, 400, 450, 500, 550, 600],
    jobTypesDistribution: [
      { label: "Routine Blood Draw", value: 35, color: "#3B82F6" },
      { label: "Diagnostic Test", value: 25, color: "#EF4444" },
      { label: "Fasting Blood Test", value: 20, color: "#10B981" },
      { label: "Home Collection", value: 15, color: "#F59E0B" },
      { label: "Pediatric Blood Draw", value: 5, color: "#8B5CF6" },
    ],
    topClients: [
      { name: "XYZ", jobsCompleted: 847, rating: 4.9, revenue: 218492 },
      { name: "XYZ", jobsCompleted: 635, rating: 4.7, revenue: 121290 },
      { name: "XYZ", jobsCompleted: 523, rating: 4.8, revenue: 98975 },
      { name: "XYZ", jobsCompleted: 412, rating: 4.6, revenue: 76850 },
    ],
    payrollSummary: {
      totalPayouts: 156890,
      platformFees: 31378,
      processingFees: 4710,
      netRevenue: 91672,
    },
    revenueByJobType: [
      { type: "Diagnostic Test", amount: 98450, color: "#EF4444" },
      { type: "Routine Blood Draw", amount: 87200, color: "#3B82F6" },
      { type: "Fasting Blood Test", amount: 65100, color: "#10B981" },
      { type: "Home Collection", amount: 34000, color: "#F59E0B" },
      { type: "Pediatric Blood Draw", amount: 34000, color: "#8B5CF6" },
    ],
  });

  // Line chart configuration
  const lineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Jobs Completed",
        data: dashboardData.jobCompletionTrend,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Pie chart configuration
  const pieChartData = {
    labels: dashboardData.jobTypesDistribution.map((item) => item.label),
    datasets: [
      {
        data: dashboardData.jobTypesDistribution.map((item) => item.value),
        backgroundColor: dashboardData.jobTypesDistribution.map(
          (item) => item.color
        ),
        borderWidth: 0,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    // Simulate data update based on filters
    updateDashboardData();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance to update data
        updateDashboardData();
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const updateDashboardData = () => {
    setDashboardData((prev) => ({
      ...prev,
      jobsCompleted: Math.floor(Math.random() * 50) + 10,
      newSignups: Math.floor(Math.random() * 20) + 1,
      revenue: Math.floor(Math.random() * 100000) + 50000,
      jobCompletionTrend: prev.jobCompletionTrend.map((value) =>
        Math.max(100, value + Math.floor(Math.random() * 40) - 20)
      ),
      topClients: prev.topClients.map((client) => ({
        ...client,
        jobsCompleted: client.jobsCompleted + Math.floor(Math.random() * 10),
        revenue: client.revenue + Math.floor(Math.random() * 5000),
      })),
    }));
  };

  const exportReport = () => {
    const reportData = {
      filters,
      dashboardData,
      exportDate: new Date().toISOString(),
      reportType: "Platform Analytics",
    };

    // Simulate different export formats
    const exportFormat = prompt(
      "Choose export format:\n1. PDF\n2. Excel\n3. CSV\nEnter 1, 2, or 3:"
    );

    switch (exportFormat) {
      case "1":
        alert("PDF report exported successfully!");
        break;
      case "2":
        alert("Excel report exported successfully!");
        break;
      case "3":
        alert("CSV report exported successfully!");
        break;
      default:
        alert("Report exported successfully!");
    }

    console.log("[v0] Export data:", reportData);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div style={{ fontFamily: "Montserrat" }} className="min-h-screen  mb-14">
      <div className=" space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live Data</span>
          </div>
        </div>

        {/* Report Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Report Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.dateRange}
                onChange={(e) =>
                  handleFilterChange("dateRange", e.target.value)
                }
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.jobType}
                onChange={(e) => handleFilterChange("jobType", e.target.value)}
              >
                <option>All Job Types</option>
                <option>Routine Blood Draw</option>
                <option>Diagnostic Test</option>
                <option>Fasting Blood Test</option>
                <option>Home Collection</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.businessName}
                onChange={(e) =>
                  handleFilterChange("businessName", e.target.value)
                }
              >
                <option>All</option>
                <option>XYZ Healthcare</option>
                <option>ABC Medical</option>
                <option>DEF Clinic</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={updateDashboardData}
                className="w-full bg-[#C9A14A] text-white px-4 py-2 rounded-md  transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Platform Overview
              </h2>
              <p className="text-sm text-gray-600">Key metrics at a glance</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={exportReport}
                className="bg-[#C9A14A] flex justify-center items-center gap-2 text-white px-4 py-2 rounded-md transition-colors"
              >
                <FaDownload /> Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className=" rounded-lg p-4 shadow-sm border transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Job Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.jobsCompleted}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">
                      <FaCheck />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className=" rounded-lg p-4 shadow-sm border transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New User Sign-ups</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.newSignups}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">
                    <FaUserPlus />
                  </span>
                </div>
              </div>
            </div>

            <div className=" rounded-lg p-4 shadow-sm border transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(dashboardData.revenue)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">
                    <FaDollarSign />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className=" rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-4">
                Job Completion Trend
              </h3>
              <div className="h-64">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </div>

            <div className=" rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-4">
                Job Types Distribution
              </h3>
              <div className="h-64">
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Client Performance Report */}
        <div className="bg-white border rounded-lg shadow-sm ">
          <h2 className="text-lg font-semibold text-gray-900 m-4">
            Top Client Performance Report
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-t border-gray-200 bg-gray-50">
                  <th className="text-left py-2 px-4 font-medium text-gray-500">
                    Business Name
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-500">
                    Jobs Completed
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-500">
                    Average Rating
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-500">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.topClients.map((client, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900">{client.name}</td>
                    <td className="py-3 px-4 text-gray-900">
                      {client.jobsCompleted}
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      <div className="flex items-center">{client.rating}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {formatCurrency(client.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Reports */}
        <div className="border  rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Financial Reports
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Detailed payout and revenue breakdowns
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t pt-6">
            {/* Payroll Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-4">
                Payroll Summary
              </h3>
              <div className="space-y-1">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Total Payouts</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(dashboardData.payrollSummary.totalPayouts)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Platform Fees</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(dashboardData.payrollSummary.platformFees)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Processing Fees</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(
                      dashboardData.payrollSummary.processingFees
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-200 pt-3">
                  <span className="text-gray-900 font-semibold">
                    Net Revenue
                  </span>
                  <span className="font-bold text-green-600 text-lg">
                    {formatCurrency(dashboardData.payrollSummary.netRevenue)}
                  </span>
                </div>
              </div>
            </div>

            {/* Revenue by Job Type */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-4">
                Revenue by Job Type
              </h3>
              <div className="space-y-1">
                {dashboardData.revenueByJobType.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-700">{item.type}</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
