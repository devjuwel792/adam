"use client";

import { useState } from "react";
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
import { useGetAnalyticsQuery } from "../../store/services/dashboardApi";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const PIE_COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6"];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount);

const AnalyticsDashboard = () => {
  const [filters, setFilters] = useState({ jobType: "All", businessName: "All" });
  const [applied, setApplied] = useState({ jobType: "All", businessName: "All" });

  const { data, isLoading, isError } = useGetAnalyticsQuery({
    job_type: applied.jobType,
    business_name: applied.businessName,
  });

  const lineChartData = {
    labels: data?.job_completion_trend?.map((d) => d.month) ?? [],
    datasets: [{
      label: "Jobs Completed",
      data: data?.job_completion_trend?.map((d) => d.completed) ?? [],
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
      fill: true,
    }],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: "#E5E7EB" } },
      x: { grid: { display: false } },
    },
  };

  const pieChartData = {
    labels: data?.job_types_distribution?.map((d) => d.name) ?? [],
    datasets: [{
      data: data?.job_types_distribution?.map((d) => d.value) ?? [],
      backgroundColor: PIE_COLORS,
      borderWidth: 0,
    }],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "right", labels: { usePointStyle: true, padding: 20 } } },
  };

  if (isLoading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load analytics.</div>;

  const { overview, filters: apiFilters, top_clients, financial_reports } = data;
  const payroll = financial_reports?.payroll_summary;

  return (
    <div style={{ fontFamily: "Montserrat" }} className="min-h-screen mb-14">
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live Data</span>
          </div>
        </div>

        {/* Filters */}
        {/* <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.jobType}
                onChange={(e) => setFilters((p) => ({ ...p, jobType: e.target.value }))}
              >
                {(apiFilters?.job_types ?? []).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.businessName}
                onChange={(e) => setFilters((p) => ({ ...p, businessName: e.target.value }))}
              >
                {(apiFilters?.business_names ?? []).map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setApplied({ ...filters })}
                className="w-full bg-[#C9A14A] text-white px-4 py-2 rounded-md transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div> */}

        {/* Platform Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Platform Overview</h2>
              <p className="text-sm text-gray-600">Key metrics at a glance</p>
            </div>
            <button className="bg-[#C9A14A] flex items-center gap-2 text-white px-4 py-2 rounded-md transition-colors">
              <FaDownload /> Export Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-lg p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Jobs Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{overview?.jobs_completed}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <FaCheck className="text-white text-xs" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New User Sign-ups</p>
                  <p className="text-2xl font-bold text-gray-900">{overview?.new_signups}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaUserPlus className="text-blue-600 text-lg" />
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(overview?.revenue)}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaDollarSign className="text-green-600 text-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-4">Job Completion Trend</h3>
              <div className="h-64">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </div>
            <div className="rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-4">Job Types Distribution</h3>
              <div className="h-64">
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Client Performance */}
        <div className="bg-white border rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 m-4">Top Client Performance Report</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-t border-gray-200 bg-gray-50">
                  <th className="text-left py-2 px-4 font-medium text-gray-500">Business Name</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-500">Jobs Completed</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-500">Average Rating</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-500">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {(top_clients ?? []).map((client, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-gray-900">{client.business_name}</td>
                    <td className="py-3 px-4 text-gray-900">{client.jobs_completed}</td>
                    <td className="py-3 px-4 text-gray-900">{client.avg_rating}</td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(client.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Reports */}
        <div className="border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Financial Reports</h2>
          <p className="text-sm text-gray-600 mb-6">Detailed payout and revenue breakdowns</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t pt-6">
            {/* Payroll Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-4">Payroll Summary</h3>
              <div className="space-y-1">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Total Payouts</span>
                  <span className="font-medium text-gray-900">{formatCurrency(payroll?.total_payouts)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Platform Fees</span>
                  <span className="font-medium text-gray-900">{formatCurrency(payroll?.platform_fees)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Processing Fees</span>
                  <span className="font-medium text-gray-900">{formatCurrency(payroll?.processing_fees)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-200 pt-3">
                  <span className="text-gray-900 font-semibold">Net Revenue</span>
                  <span className="font-bold text-green-600 text-lg">{formatCurrency(payroll?.net_revenue)}</span>
                </div>
              </div>
            </div>

            {/* Revenue by Job Type */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-4">Revenue by Job Type</h3>
              <div className="space-y-1">
                {(financial_reports?.revenue_by_job_type ?? []).map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></div>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{formatCurrency(item.value)}</span>
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
