import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Create Users
    const admin = await prisma.user.upsert({
        where: { email: 'admin@portfolio.dev' },
        update: {},
        create: {
            email: 'admin@portfolio.dev',
            name: 'Admin User',
            role: Role.ADMIN,
        },
    });

    const user = await prisma.user.upsert({
        where: { email: 'user@portfolio.dev' },
        update: {},
        create: {
            email: 'user@portfolio.dev',
            name: 'Regular User',
            role: Role.USER,
        },
    });

    // Create Posts
    const posts = await Promise.all([
        prisma.blogPost.create({
            data: {
                title: 'Getting Started with Next.js 15',
                slug: 'nextjs-15-guide',
                content: '# Hello Next.js 15',
                authorId: admin.id,
                tags: ['nextjs', 'react'],
                published: true,
            },
        }),
        prisma.blogPost.create({
            data: {
                title: 'Mastering Prisma',
                slug: 'mastering-prisma',
                content: '# Database operations made easy',
                authorId: admin.id,
                tags: ['prisma', 'db'],
                published: true,
            },
        }),
        prisma.blogPost.create({
            data: {
                title: '3D Web with R3F',
                slug: 'r3f-guide',
                content: '# Creating immersive 3D experiences',
                authorId: admin.id,
                tags: ['r3f', 'threejs'],
                published: true,
            },
        }),
    ]);

    // Create Projects
    await prisma.project.createMany({
        data: [
            { title: 'Portfolio v2', slug: 'portfolio-v2', description: 'Next-gen portfolio', content: 'Portfolio content', techStack: ['Next.js', 'Prisma'], featured: true },
            { title: 'E-commerce App', slug: 'ecommerce-app', description: 'Modern e-commerce', content: 'E-commerce content', techStack: ['Next.js', 'Supabase'], featured: true },
            { title: 'Task Tracker', slug: 'task-tracker', description: 'Task management', content: 'Task tracker content', techStack: ['React', 'TypeScript'], featured: false },
        ],
    });

    // Create Comments
    const comment1 = await prisma.comment.create({
        data: {
            content: 'Great post!',
            authorId: user.id,
            postId: posts[0].id,
        },
    });

    await prisma.comment.create({
        data: {
            content: 'Thanks!',
            authorId: admin.id,
            postId: posts[0].id,
            parentId: comment1.id,
        },
    });

    // Reactions
    await prisma.reaction.create({
        data: {
            emoji: '👍',
            userId: user.id,
            postId: posts[0].id,
        },
    });

    // Guestbook
    await prisma.guestbookEntry.createMany({
        data: [
            { message: 'Love the site!', authorId: user.id },
            { message: 'Awesome work!', authorId: admin.id },
            { message: 'Very clean design.', authorId: user.id },
        ],
    });

    // Newsletter
    await prisma.newsletter.createMany({
        data: [
            { email: 'subscriber1@test.com', verified: true },
            { email: 'subscriber2@test.com', verified: false },
        ],
    });

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
