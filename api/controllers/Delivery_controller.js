import Delivery from '../models/Delivery_model.js';

export const saveDeliveryDetails = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    zipCode,
    subtotal,
    deliveryFee,
    total,
  } = req.body;

  try {
    const delivery = new Delivery({
      firstName,
      lastName,
      email,
      phone,
      address,
      zipCode,
      subtotal,
      deliveryFee,
      total,
    });

    await delivery.save();

    res.status(201).json({
      message: 'Delivery details saved successfully',
      delivery,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};
