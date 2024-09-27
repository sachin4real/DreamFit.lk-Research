import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({

 
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const clothesProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sku: { type: String, required: true },
  sizeOptions: { type: [String], required: true },
  images: { type: [String], required: true },
  customizeLink: { type: String, required: true },
  inStock: { type: Boolean, required: true, default: true },
  viewDetails: { type: String, required: true },
  category: { type: String, required: true },
  details: {
    chest: { type: String, required: true },
    length: { type: String, required: true },
    shoulders: { type: String, required: true },
    material: { type: String, required: true },
    color: { type: String, required: true },
    fitType: { type: String, required: true },
    stretch: { type: String, required: true },
    style: { type: String, required: true },
    modelSize: { type: String, required: true },
    care: { type: String, required: true },
    note: { type: String },
  },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [reviewSchema], // New field for reviews
}, { timestamps: true });

const ClothesProduct = mongoose.model('ClothesProduct', clothesProductSchema);
export default ClothesProduct;