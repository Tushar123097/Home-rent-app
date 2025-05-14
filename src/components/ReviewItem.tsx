import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : index < rating
            ? 'text-yellow-400 fill-yellow-400 opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-800">{review.userName}</h4>
          <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
        </div>
        <div className="flex items-center">
          {renderStars(review.rating)}
          <span className="ml-2 text-sm font-medium text-gray-700">{review.rating}</span>
        </div>
      </div>
      <p className="mt-3 text-gray-600">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;