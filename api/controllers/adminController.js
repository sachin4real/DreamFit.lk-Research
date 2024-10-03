import ClothesProduct from '../models/clothesProduct.js';
import Delivery from '../models/Delivery_model.js';
import Support from '../models/Support_model.js'; // Import Support model

export const getAdminSalesReport = async (req, res) => {
  try {
    // Get total number of products
    const totalProductCount = await ClothesProduct.countDocuments();

    // Get total sales from the Delivery model
    const totalSales = await Delivery.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$total' }, // Sum the total field in Delivery
        },
      },
    ]);

    const totalSalesAmount = totalSales.length > 0 ? totalSales[0].totalAmount : 0;

    // Get count of open support tickets
    const openTicketCount = await Support.countDocuments({ status: 'open' });

    // Aggregate sales by date (group by date and sum the total field)
    const salesByDate = await Delivery.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
          totalSales: { $sum: '$total' }, // Sum the total for each date
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date (ascending)
      },
    ]);

    res.status(200).json({
      totalProductCount,
      totalSalesAmount,
      openTicketCount, // Include open ticket count
      salesByDate, // Include sales by date
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error generating sales report',
      error: error.message,
    });
  }
};
