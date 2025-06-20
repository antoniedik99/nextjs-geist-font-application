import { Router, Request, Response } from 'express';
import { prisma } from '../app';

const router = Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users', error });
  }
});

// Get user by id
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user', error });
  }
});

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { email, name } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { email, name },
      select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
});

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
});

export default router;
