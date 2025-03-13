
export interface Review {
  id: string;
  platform: 'talabat' | 'noon' | 'careem' | 'google';
  rating: number;
  comment: string;
  date: string;
  reviewer: string;
  location: string;
  brand: string;
}

export interface AggregatedRatings {
  platform: string;
  averageRating: number;
  reviewCount: number;
  color: string;
}

export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

export interface FilterOptions {
  locations: string[];
  brands: string[];
}

export const generateMockReviews = (): Review[] => {
  const platforms = ['talabat', 'noon', 'careem', 'google'] as const;
  const locations = ['Downtown', 'Business Bay', 'Marina', 'JBR', 'Festival City'];
  const brands = ['Main Branch', 'Express', 'Premium', 'Cafe'];
  const reviewers = ['Ahmed S.', 'Sarah M.', 'John D.', 'Fatima K.', 'Mohammed R.', 'Lisa T.', 'Ali H.', 'Emma W.'];
  
  const positiveComments = [
    "Absolutely loved the food! Fast delivery and excellent packaging.",
    "The best shawarma in town. Will definitely order again!",
    "Friendly staff and amazing taste. Highly recommended!",
    "Food was delicious and arrived hot. Great value for money.",
    "Outstanding service and quality. My new favorite restaurant!",
  ];
  
  const neutralComments = [
    "Food was okay. Nothing special but not bad either.",
    "Delivery was on time, but the food was slightly cold.",
    "Average taste, reasonable prices.",
    "Decent food but portion size could be better.",
    "Not bad, might order again if I'm in the area.",
  ];
  
  const negativeComments = [
    "Very disappointed with the quality. Not as advertised.",
    "Food was cold and delivery took too long.",
    "Poor packaging, food was spilled. Won't order again.",
    "Overpriced for the quality you get. Not worth it.",
    "Wrong order delivered and customer service was unhelpful.",
  ];

  const reviews: Review[] = [];
  
  // Generate 100 random reviews
  for (let i = 0; i < 100; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const rating = Math.floor(Math.random() * 5) + 1;
    
    let comment;
    if (rating >= 4) {
      comment = positiveComments[Math.floor(Math.random() * positiveComments.length)];
    } else if (rating === 3) {
      comment = neutralComments[Math.floor(Math.random() * neutralComments.length)];
    } else {
      comment = negativeComments[Math.floor(Math.random() * negativeComments.length)];
    }
    
    // Generate a random date within the last 3 months
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    const randomDate = new Date(
      threeMonthsAgo.getTime() + Math.random() * (today.getTime() - threeMonthsAgo.getTime())
    );
    
    reviews.push({
      id: `review-${i}`,
      platform,
      rating,
      comment,
      date: randomDate.toISOString().split('T')[0],
      reviewer: reviewers[Math.floor(Math.random() * reviewers.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      brand: brands[Math.floor(Math.random() * brands.length)]
    });
  }
  
  return reviews;
};

export const getAggregatedRatings = (reviews: Review[]): AggregatedRatings[] => {
  const platforms = [
    { id: 'talabat', name: 'Talabat', color: '#F97316' },
    { id: 'noon', name: 'Noon', color: '#FACC15' },
    { id: 'careem', name: 'Careem', color: '#84CC16' },
    { id: 'google', name: 'Google', color: '#3B82F6' }
  ];
  
  return platforms.map(platform => {
    const platformReviews = reviews.filter(review => review.platform === platform.id);
    const totalRating = platformReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = platformReviews.length > 0 
      ? parseFloat((totalRating / platformReviews.length).toFixed(1)) 
      : 0;
    
    return {
      platform: platform.name,
      averageRating,
      reviewCount: platformReviews.length,
      color: platform.color
    };
  });
};

export const getSentimentData = (reviews: Review[]): SentimentData => {
  const positive = reviews.filter(review => review.rating >= 4).length;
  const neutral = reviews.filter(review => review.rating === 3).length;
  const negative = reviews.filter(review => review.rating <= 2).length;
  
  return {
    positive,
    neutral,
    negative
  };
};

export const getTopReviews = (reviews: Review[], isPositive: boolean, limit: number = 3): Review[] => {
  return [...reviews]
    .filter(review => isPositive ? review.rating >= 4 : review.rating <= 2)
    .sort((a, b) => isPositive ? b.rating - a.rating : a.rating - b.rating)
    .slice(0, limit);
};

export const getFilterOptions = (reviews: Review[]): FilterOptions => {
  const locations = [...new Set(reviews.map(review => review.location))];
  const brands = [...new Set(reviews.map(review => review.brand))];
  
  return {
    locations,
    brands
  };
};

export const filterReviews = (
  reviews: Review[], 
  selectedPlatforms: string[] = [],
  selectedLocations: string[] = [],
  selectedBrands: string[] = []
): Review[] => {
  return reviews.filter(review => {
    const platformMatch = selectedPlatforms.length === 0 || selectedPlatforms.includes(review.platform);
    const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(review.location);
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(review.brand);
    
    return platformMatch && locationMatch && brandMatch;
  });
};
