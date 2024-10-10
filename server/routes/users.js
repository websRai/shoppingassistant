import express from 'express';
import { prisma } from '../index.js';

const router = express.Router();

router.get('/:id/wishlist', async (req, res) => {
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { userId: parseInt(req.params.id) },
      include: { product: true },
    });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching wishlist' });
  }
});

router.post('/:id/wishlist', async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: parseInt(req.params.id),
        productId: parseInt(productId),
      },
    });
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding to wishlist' });
  }
});

export default router;