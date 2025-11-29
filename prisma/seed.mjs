import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  const projects = [
    {
      title: "AMP Vending",
      description: "Production website for local vending machine business. Live and actively used by real business.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind", "Responsive Design"],
      category: "production",
      isLive: true,
      clientType: "business",
      featured: true,
      images: ["/images/projects/amp-vending/amp-vending-1.png"],
      imagesAlt: ["/images/projects/amp-vending/amp-vending-1.png"],
      demoLink: "https://www.ampvendingmachines.com",
      codeLink: "https://github.com/AaronAPerez/AMP-Vending_Website",
      websiteLink: "https://www.ampvendingmachines.com",
      gradientFrom: "#FD5A1E",
      gradientTo: "#A5ACAF",
      order: 1,
      published: true,
    },
    {
      title: "CloudGov Dashboard",
      description: "Enterprise cloud management platform built to demonstrate qualifications for LLNL Software Developer position. Showcases full-stack skills, testing, and production-ready code.",
      tech: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Jest", "Playwright"],
      category: "portfolio",
      isLive: true,
      clientType: "demo",
      featured: true,
      images: ["/images/projects/cloudgov-dashboard/cloudgov-1.png"],
      imagesAlt: ["/images/projects/cloudgov-dashboard/cloudgov-dashboard-preview.png"],
      demoLink: "https://cloudgov-dashboard.vercel.app",
      codeLink: "https://github.com/YOUR_USERNAME/cloudgov-dashboard",
      websiteLink: "https://cloudgov-dashboard.vercel.app",
      gradientFrom: "#2563EB",
      gradientTo: "#16A34A",
      order: 2,
      published: true,
    },
    {
      title: "The Glamping Spot",
      description: "Booking platform for luxury camping locations. Real production website with interactive features.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "Express", "MongoDB", "Mapbox API"],
      category: "production",
      isLive: true,
      clientType: "business",
      featured: true,
      images: ["/images/projects/theglampingspot/glamping-1.png"],
      imagesAlt: ["/images/projects/theglampingspot/glamping-1.png"],
      demoLink: "https://www.theglampingspot.net",
      codeLink: "https://github.com/AaronAPerez/the-glamping-spot",
      websiteLink: "https://www.theglampingspot.net",
      gradientFrom: "#F59E0B",
      gradientTo: "#15803D",
      order: 3,
      published: true,
    },
    {
      title: "Goldmine Communications & Construction",
      description: "Production website for telecommunications infrastructure company. Responsive design with professional branding.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind"],
      category: "production",
      isLive: true,
      clientType: "business",
      featured: true,
      images: ["/images/projects/goldmine_website/goldmine_1.svg"],
      imagesAlt: ["/images/projects/goldmine_website/goldmine_1.svg"],
      demoLink: "https://www.goldminecomm.net",
      codeLink: "https://github.com/AaronAPerez/Goldmine_Communications_Construction_Website",
      websiteLink: "https://www.goldminecomm.net",
      gradientFrom: "#bf9b30",
      gradientTo: "#d4af37",
      order: 4,
      published: true,
    },
    {
      title: "Portfolio Website v3.0",
      description: "Personal portfolio built with Next.js 15, React 19, and TypeScript. Demonstrates advanced patterns, accessibility, and performance optimization with 100 Lighthouse scores.",
      tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
      category: "portfolio",
      isLive: true,
      featured: true,
      images: ["/images/projects/portfolio-v3/hero.png"],
      imagesAlt: ["Portfolio homepage"],
      demoLink: "https://aaronaperez.dev",
      codeLink: "https://github.com/AaronAPerez/NextJS-Portfolio",
      gradientFrom: "#6366F1",
      gradientTo: "#8B5CF6",
      order: 5,
      published: true,
    },
  ];

  console.log('📦 Seeding projects...');
  for (const project of projects) {
    try {
      await prisma.project.create({ data: project });
      console.log(`  ✓ ${project.title}`);
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`  ↻ ${project.title} (already exists)`);
      } else {
        throw error;
      }
    }
  }

  const skills = [
    { name: "React", category: "Frontend", proficiency: 95, order: 1 },
    { name: "TypeScript", category: "Frontend", proficiency: 90, order: 2 },
    { name: "Next.js", category: "Frontend", proficiency: 90, order: 3 },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 95, order: 4 },
    { name: "JavaScript", category: "Frontend", proficiency: 95, order: 5 },
    { name: "HTML/CSS", category: "Frontend", proficiency: 95, order: 6 },
    { name: "Node.js", category: "Backend", proficiency: 85, order: 7 },
    { name: "Express", category: "Backend", proficiency: 80, order: 8 },
    { name: "REST APIs", category: "Backend", proficiency: 90, order: 9 },
    { name: "PostgreSQL", category: "Database", proficiency: 80, order: 10 },
    { name: "MongoDB", category: "Database", proficiency: 75, order: 11 },
    { name: "Prisma", category: "Database", proficiency: 85, order: 12 },
    { name: "Git", category: "DevOps", proficiency: 90, order: 13 },
    { name: "Docker", category: "DevOps", proficiency: 70, order: 14 },
    { name: "Vercel", category: "DevOps", proficiency: 90, order: 15 },
  ];

  console.log('🎯 Seeding skills...');
  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: skill,
      create: skill,
    });
    console.log(`  ✓ ${skill.name}`);
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
