import mongoose from 'mongoose';

const clothesProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  sizeOptions: {
    type: [String],
    required: true,
  },
  images: {
    type: [String],
    required: false,
  },
  customizeLink: {
    type: String,
    required: false,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0, // Default value set to 0 if not specified
  },
  viewDetails: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
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
}, { timestamps: true });

const ClothesProduct = mongoose.model('ClothesProduct', clothesProductSchema);

export default ClothesProduct;
