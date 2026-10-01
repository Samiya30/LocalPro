import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const categories = [
  {
    name: "Electrician",
    slug: "electrician",
    description: "Electrical installation, repair, and maintenance services.",
  },
  {
    name: "Plumber",
    slug: "plumber",
    description: "Plumbing installation, repair, and maintenance services.",
  },
  {
    name: "AC Repair",
    slug: "ac-repair",
    description: "Air conditioner repair, servicing, and installation.",
  },
  {
    name: "Appliance Repair",
    slug: "appliance-repair",
    description: "Repair and maintenance for household appliances.",
  },
  {
    name: "Home Cleaning",
    slug: "home-cleaning",
    description: "Professional home and deep cleaning services.",
  },
  {
    name: "Pest Control",
    slug: "pest-control",
    description: "Residential and commercial pest control services.",
  },
  {
    name: "Carpenter",
    slug: "carpenter",
    description: "Furniture, woodwork, repair, and carpentry services.",
  },
  {
    name: "Painter",
    slug: "painter",
    description: "Interior and exterior painting services.",
  },
  {
    name: "Interior Designer",
    slug: "interior-designer",
    description: "Interior planning, design, and decoration services.",
  },
  {
    name: "Photographer",
    slug: "photographer",
    description: "Professional photography services for different occasions.",
  },
  {
    name: "Makeup Artist",
    slug: "makeup-artist",
    description: "Professional makeup and beauty services.",
  },
  {
    name: "Tutor",
    slug: "tutor",
    description: "Private tutoring and academic learning services.",
  },
  {
    name: "Fitness Trainer",
    slug: "fitness-trainer",
    description: "Personal fitness training and coaching services.",
  },
  {
    name: "Computer Repair",
    slug: "computer-repair",
    description: "Computer troubleshooting, repair, and maintenance.",
  },
  {
    name: "Car Wash",
    slug: "car-wash",
    description: "Professional car washing and cleaning services.",
  },
  {
    name: "Beauty Services",
    slug: "beauty-services",
    description: "Beauty, grooming, and personal care services.",
  },
  {
    name: "Event Services",
    slug: "event-services",
    description: "Professional services for planning and managing events.",
  },
  {
    name: "Wedding Services",
    slug: "wedding-services",
    description: "Professional services for weddings and related occasions.",
  },
  {
    name: "Moving & Packers",
    slug: "moving-packers",
    description: "Packing, moving, and relocation services.",
  },
  {
    name: "Handyman",
    slug: "handyman",
    description: "General home maintenance and repair services.",
  },
];

async function main() {
  console.log("Seeding LocalPro categories...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        name: category.name,
        description: category.description,
        isActive: true,
      },
      create: category,
    });
  }

  console.log(`Seeded ${categories.length} categories.`);
}

main()
  .catch((error) => {
    console.error("Category seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });