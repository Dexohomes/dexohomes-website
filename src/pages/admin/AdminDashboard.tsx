
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Calendar, TrendingUp, Star, Image } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getLeads } from "@/services/leadService";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  // Get actual leads data
  const { data: leadsData, isLoading: leadsLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: getLeads
  });

  // Mock data for the dashboard
  const stats = [
    {
      title: "Total Leads",
      value: leadsLoading ? "..." : (leadsData?.length || 0).toString(),
      change: "+12%",
      icon: <MessageSquare className="h-8 w-8 text-brand-yellow" />,
      link: "/admin/leads"
    },
    {
      title: "Website Visitors",
      value: "3,456",
      change: "+8%",
      icon: <Users className="h-8 w-8 text-brand-yellow" />,
      link: "#"
    },
    {
      title: "Content Items",
      value: "24",
      change: "+5%",
      icon: <Image className="h-8 w-8 text-brand-yellow" />,
      link: "/admin/content"
    },
    {
      title: "Reviews",
      value: "42",
      change: "+16%",
      icon: <Star className="h-8 w-8 text-brand-yellow" />,
      link: "/admin/reviews"
    },
  ];

  const recentLeads = leadsLoading 
    ? Array(5).fill({ id: 0, name: "Loading...", service: "...", date: "...", status: "..." })
    : (leadsData?.slice(0, 5).map(lead => ({
        id: lead.id,
        name: lead.name,
        service: lead.service, 
        date: new Date(lead.created_at).toLocaleDateString(),
        status: lead.status
      })) || []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <Link to={stat.link}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-500">{stat.change} from last month</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Latest inquiries from your website</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/leads">View All</Link>
            </Button>
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
                  {recentLeads.map((lead, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
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

        {/* Quick Navigation */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Features</CardTitle>
            <CardDescription>Quick access to main features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/admin/leads">
                <MessageSquare className="mr-2 h-4 w-4" />
                Manage Leads
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/admin/content">
                <Image className="mr-2 h-4 w-4" />
                Content Management
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/admin/reviews">
                <Star className="mr-2 h-4 w-4" />
                Customer Reviews
              </Link>
            </Button>
            <div className="pt-4">
              <p className="text-sm font-medium mb-2">Overview</p>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Leads Conversion</span>
                    <span className="text-sm font-medium">24%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-yellow h-2 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Reviews (5 star)</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-brand-yellow h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
