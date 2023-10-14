import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const applyJob = async (req, res) => {
  const { jobPostingId, userId } = req.body;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        jobPostingId,
      },
    });
    res
      .status(201)
      .json({ message: `applied for job posting id ${jobPostingId}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'appply job error' });
  }
};
