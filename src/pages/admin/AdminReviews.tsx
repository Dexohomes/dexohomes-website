
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from 'sonner';

const AdminReviews = () => {
  const [reviewFilter, setReviewFilter] = useState("all");

  // Mock reviews data
  const mockReviews = [
    { id: 1, name: "Anjali Sharma", rating: 5, review: "Exceptional service!", date: "2025-04-12", status: "published" },
    { id: 2, name: "Rajesh Kumar", rating: 4, review: "Very satisfied with the kitchen renovation.", date: "2025-04-08", status: "published" },
    { id: 3, name: "Priya Patel", rating: 5, review: "Amazing work on our bedroom design.", date: "2025-03-27", status: "pending" },
    { id: 4, name: "Vikram Singh", rating: 5, review: "The team was professional and delivered on time.", date: "2025-03-15", status: "published" },
    { id: 5, name: "Neha Gupta", rating: 4, review: "Great attention to detail. Very pleased with the results.", date: "2025-03-10", status: "published" },
  ];
  
  const filteredReviews = reviewFilter === "all" 
    ? mockReviews 
    : mockReviews.filter(review => review.status === reviewFilter);

  const handleUpdateReviewStatus = (id: number, newStatus: string) => {
    toast.success(`Review status updated`, {
      description: `Review #${id} status changed to ${newStatus}`
    });
    // In a real app, you would update the database
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex justify-between items-center">
          <span>Customer Reviews</span>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <span className="hidden sm:inline">Add Review</span>
            <span className="sm:hidden">+</span>
          </Button>
        </CardTitle>
        <CardDescription>
          Manage and moderate customer testimonials
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          <Button 
            variant={reviewFilter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setReviewFilter("all")}
            className={reviewFilter === "all" ? "bg-brand-yellow text-black hover:bg-brand-yellow/90" : ""}
          >
            All Reviews
          </Button>
          <Button 
            variant={reviewFilter === "published" ? "default" : "outline"} 
            size="sm"
            onClick={() => setReviewFilter("published")}
            className={reviewFilter === "published" ? "bg-brand-yellow text-black hover:bg-brand-yellow/90" : ""}
          >
            Published
          </Button>
          <Button 
            variant={reviewFilter === "pending" ? "default" : "outline"} 
            size="sm"
            onClick={() => setReviewFilter("pending")}
            className={reviewFilter === "pending" ? "bg-brand-yellow text-black hover:bg-brand-yellow/90" : ""}
          >
            Pending
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {filteredReviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{review.name}</h3>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500">{review.date}</div>
                  <span 
                    className={`px-2 py-1 text-xs rounded-full ${
                      review.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {review.status === "published" ? "Published" : "Pending"}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-2">{review.review}</p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="text-xs">Edit</Button>
                {review.status === "pending" ? (
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="text-xs bg-green-600 hover:bg-green-700"
                    onClick={() => handleUpdateReviewStatus(review.id, "published")}
                  >
                    Approve
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => handleUpdateReviewStatus(review.id, "pending")}
                  >
                    Unpublish
                  </Button>
                )}
                <Button size="sm" variant="destructive" className="text-xs">Delete</Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Review Stats</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-2 bg-white rounded shadow-sm">
              <div className="text-xl font-bold">{mockReviews.length}</div>
              <div className="text-xs text-gray-500">Total Reviews</div>
            </div>
            <div className="p-2 bg-white rounded shadow-sm">
              <div className="text-xl font-bold">
                {(mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length).toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">Average Rating</div>
            </div>
            <div className="p-2 bg-white rounded shadow-sm">
              <div className="text-xl font-bold">
                {mockReviews.filter(r => r.rating === 5).length}
              </div>
              <div className="text-xs text-gray-500">5-Star Reviews</div>
            </div>
            <div className="p-2 bg-white rounded shadow-sm">
              <div className="text-xl font-bold">
                {mockReviews.filter(r => r.status === "published").length}
              </div>
              <div className="text-xs text-gray-500">Published</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminReviews;
