import Card from '../models/card_model.js';

// Save card details (without totalAmount, which should only be required during payments)
export const saveCardDetails = async (req, res) => {
  let { cardNumber, expiryDate, cvc, cardholderName } = req.body;

  try {
    cardNumber = cardNumber.replace(/\s/g, ''); // Remove spaces

    // Check if card already exists
    const existingCard = await Card.findOne({ cardNumber });
    if (existingCard) {
      return res.status(400).json({ message: 'Card already saved' });
    }

    const card = new Card({
      cardNumber,
      expiryDate,
      cvc,
      cardholderName,
    });

    await card.save();
    res.status(201).json({
      message: 'Card saved successfully',
      card,
    });
  } catch (error) {
    console.error('Error saving card details:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get all saved cards
export const getSavedCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update card details
export const updateCardDetails = async (req, res) => {
  const { id } = req.params;
  let { cardNumber, expiryDate, cvc, cardholderName } = req.body;

  try {
    cardNumber = cardNumber.replace(/\s/g, '');

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { cardNumber, expiryDate, cvc, cardholderName },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.status(200).json({
      message: 'Card updated successfully',
      card: updatedCard,
    });
  } catch (error) {
    console.error('Error updating card details:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete card details
export const deleteCard = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.status(200).json({
      message: 'Card deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Process payment (with totalAmount)
export const processPayment = async (req, res) => {
  const { cardNumber, expiryDate, cvc, cardholderName, totalAmount } = req.body;

  if (!totalAmount) {
    return res.status(400).json({ error: 'Total amount is required for payment' });
  }

  try {
    const formattedCardNumber = cardNumber.replace(/\s/g, '');

    const paymentCard = await Card.findOne({ cardNumber: formattedCardNumber });

    if (!paymentCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Here you would integrate the actual payment gateway logic
    res.status(200).json({
      message: 'Payment processed successfully',
      totalAmount,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};
