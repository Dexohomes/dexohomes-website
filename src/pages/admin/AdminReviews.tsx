
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Search, Star, Edit, Trash } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    name: "Anjali Sharma",
    rating: 5,
    review: "Exceptional service! The team at Dexohomes completely transformed my living room.",
    date: "2025-04-12"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rating: 4,
    review: "Very satisfied with the kitchen renovation. Professional and timely.",
    date: "2025-04-08"
  },
  {
    id: 3,
    name: "Priya Patel",
    rating: 5,
    review: "Amazing work on our bedroom design. Exactly what we wanted!",
    date: "2025-03-27"
  },
  {
    id: 4,
    name: "Aditya Singh",
    rating: 4,
    review: "Great attention to detail in our bathroom remodel.",
    date: "2025-03-15"
  }
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [editReview, setEditReview] = useState<null | {
    id: number;
    name: string;
    rating: number;
    review: string;
  }>(null);
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredReviews = reviews.filter(review =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.review.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (review: typeof reviews[0]) => {
    setEditReview({
      id: review.id,
      name: review.name,
      rating: review.rating,
      review: review.review
    });
  };

  const handleDelete = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id));
    toast({
      title: "Review Deleted",
      description: "The review has been successfully removed."
    });
  };

  const handleSaveEdit = () => {
    if (editReview) {
      setReviews(reviews.map(review =>
        review.id === editReview.id ? { ...review, ...editReview } : review
      ));
      setEditReview(null);
      toast({
        title: "Review Updated",
        description: "The review has been successfully updated."
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editReview) {
      setEditReview({
        ...editReview,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleRatingChange = (rating: number) => {
    if (editReview) {
      setEditReview({
        ...editReview,
        rating
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Reviews Management</h1>
        <p className="text-gray-600">Manage and moderate customer testimonials</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>View and manage all customer testimonials</CardDescription>
          <div className="relative mt-4 w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of all customer reviews.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="w-[400px]">Review</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">No reviews found</TableCell>
                </TableRow>
              ) : (
                filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.name}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{review.review}</TableCell>
                    <TableCell>{review.date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(review)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => handleDelete(review.id)}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {editReview && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Review</CardTitle>
            <CardDescription>Update the customer review details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name</label>
                <Input 
                  name="name"
                  value={editReview.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 cursor-pointer ${i < editReview.rating ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`}
                      onClick={() => handleRatingChange(i + 1)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Review Text</label>
                <Textarea 
                  name="review"
                  value={editReview.review}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditReview(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AdminReviews;
