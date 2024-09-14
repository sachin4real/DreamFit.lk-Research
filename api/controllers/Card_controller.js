import Card from '../models/card_model.js';


export const saveCardDetails = async (req, res) => {
  const { cardNumber, expiryDate, cvc, cardholderName, totalAmount } = req.body;

  try {
    const card = new Card({
      cardNumber,
      expiryDate,
      cvc,
      cardholderName,
      totalAmount,
    });

    await card.save();

    res.status(201).json({
      message: 'Card details saved successfully',
      card,
    });
  } catch (error) {
    console.error('Error saving card details:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};
