import express from 'express';
import { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById, updateProductById, deleteProductById,addProductReview,getProductByIdWithReviews} from '../controllers/clothesProductController.js';
import multer from 'multer';
import path from 'path';

// Setup multer for file uploads with unique filenames and file type validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Create unique suffix using timestamp and random number
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // Append the unique suffix to the original file name
  }
});

// File type validation: only allow image files
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/; // Allowed extensions
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Check extension
  const mimeType = fileTypes.test(file.mimetype); // Check MIME type

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'));
  }
};

// Configure multer with storage and fileFilter
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

const router = express.Router();

// Add product route with image uploads
router.post('/add', upload.array('images', 5), addProduct);

// Get all products route
router.get('/all', getAllProducts);

// Get product by ID route
router.get('/:id', getProductById);

// Edit a product
router.put('/edit/:id', upload.array('images', 5), updateProduct);

// Update product route
router.put('/:id', upload.array('images', 5), updateProductById);

// Delete a product
router.delete('/delete/:id', deleteProduct);

// Delete product route
router.delete('/:id', deleteProductById);

// In your routes file
router.post('/:sku/review', addProductReview);

router.get('/:sku/reviews', getProductByIdWithReviews);

export default router;
