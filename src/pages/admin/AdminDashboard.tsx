
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Calendar, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  // Mock data for the dashboard
  const stats = [
    {
      title: "Total Leads",
      value: "124",
      change: "+12%",
      icon: <MessageSquare className="h-8 w-8 text-brand-yellow" />,
    },
    {
      title: "Website Visitors",
      value: "3,456",
      change: "+8%",
      icon: <Users className="h-8 w-8 text-brand-yellow" />,
    },
    {
      title: "Scheduled Consultations",
      value: "38",
      change: "+24%",
      icon: <Calendar className="h-8 w-8 text-brand-yellow" />,
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      change: "+2%",
      icon: <TrendingUp className="h-8 w-8 text-brand-yellow" />,
    },
  ];

  const recentLeads = [
    { id: 1, name: "John Smith", service: "Full Home", date: "2 hours ago", status: "New" },
    { id: 2, name: "Maria Garcia", service: "Kitchen", date: "5 hours ago", status: "Contacted" },
    { id: 3, name: "Robert Chen", service: "Bathroom", date: "1 day ago", status: "Meeting" },
    { id: 4, name: "Sarah Johnson", service: "Office", date: "1 day ago", status: "New" },
    { id: 5, name: "David Kim", service: "Wardrobe", date: "2 days ago", status: "Quoted" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-500">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest inquiries from your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left">Name</th>
                    <th className="py-3 text-left">Service</th>
                    <th className="py-3 text-left">Received</th>
                    <th className="py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{lead.name}</td>
                      <td className="py-3">{lead.service}</td>
                      <td className="py-3">{lead.date}</td>
                      <td className="py-3">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs ${
                            lead.status === "New" ? "bg-green-100 text-green-800" :
                            lead.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                            lead.status === "Meeting" ? "bg-purple-100 text-purple-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Website visits</span>
                <span className="text-sm font-medium">3,456</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-brand-yellow h-2 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Form submissions</span>
                <span className="text-sm font-medium">124</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-brand-yellow h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Conversion rate</span>
                <span className="text-sm font-medium">3.6%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-brand-yellow h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Consultations booked</span>
                <span className="text-sm font-medium">38</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-brand-yellow h-2 rounded-full" style={{ width: "32%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
