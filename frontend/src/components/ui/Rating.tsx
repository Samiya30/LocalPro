import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  reviews?: number;
}

function Rating({ rating, reviews }: RatingProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="flex items-center gap-1 font-semibold text-slate-800">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        {rating.toFixed(1)}
      </span>

      {reviews !== undefined && (
        <span className="text-slate-400">
          ({reviews})
        </span>
      )}
    </div>
  );
}

export default Rating;