import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getJobs = async (req, res) => {
  const searchCondition = { contains: req.query.search, mode: 'insensitive' };

  try {
    const posts = await prisma.jobPosting.findMany({
      select: {
        id: true,
        company: {
          select: {
            name: true,
            country: true,
            region: true,
          },
        },
        position: true,
        skills: true,
        reward: true,
      },
      where: {
        OR: [
          {
            company: {
              name: searchCondition,
            },
          },
          { position: searchCondition },
          { content: searchCondition },
          { skills: { has: req.query.search } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    const modifiedPosts = posts.map((post) => ({
      id: post.id,
      companyName: post.company.name,
      companyCountry: post.company.country,
      companyRegion: post.company.region,
      position: post.position,
      reward: post.reward,
      skills: post.skills,
    }));
    res.status(200).json(modifiedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get job postings error' });
  }
};

export const getJobById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const post = await prisma.jobPosting.findUnique({
      select: {
        id: true,
        company: {
          select: {
            name: true,
            country: true,
            region: true,
            jobPostings: { select: { id: true }, where: { NOT: { id } } },
          },
        },
        users: {
          select: {
            id: true,
          },
        },
        position: true,
        skills: true,
        reward: true,
        content: true,
      },
      where: { id },
    });
    if (!post) {
      return res
        .status(404)
        .json({ message: `job posting id ${id} not found` });
    }

    const modifiedPost = {
      id: post.id,
      companyName: post.company.name,
      companyCountry: post.company.country,
      companyRegion: post.company.region,
      position: post.position,
      reward: post.reward,
      skills: post.skills,
      content: post.content,
      companyOtherJobPosts: post.company.jobPostings.map(
        (jobPost) => jobPost.id
      ),
      applicatns: post.users.map((user) => user.id),
    };

    return res.status(200).json(modifiedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'get job posting by id error' });
  }
};

export const postJob = async (req, res) => {
  const { companyId, position, reward, content, skills } = req.body;

  try {
    const post = await prisma.jobPosting.create({
      data: {
        companyId,
        position,
        reward,
        content,
        skills,
      },
    });
    res.status(201).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'create job posting error' });
  }
};

export const updateJob = async (req, res) => {
  const id = Number(req.params.id);
  const { position, reward, content, skills } = req.body;

  try {
    const post = await prisma.jobPosting.update({
      data: {
        position,
        reward,
        content,
        skills,
      },
      where: { id },
    });
    res.status(201).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'update job posting error' });
  }
};

export const deleteJob = async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.jobPosting.delete({ where: { id } });
    res.status(200).json({ message: `job posting ${id} deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'delete job posting error' });
  }
};
