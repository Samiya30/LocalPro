import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";
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
const providers = [
    {
        name: "Rahul Sharma",
        email: "rahul.electrician@localpro.test",
        phone: "9876500001",
        businessName: "Rahul Electrical Services",
        description: "Professional electrician providing residential and commercial electrical services.",
        city: "Panchkula",
        state: "Haryana",
        pincode: "134109",
        experienceYears: 8,
        rating: 4.8,
        totalReviews: 124,
        serviceCategory: "electrician",
        serviceName: "Home Electrical Repair",
        serviceDescription: "Switches, sockets, wiring, fans, lights, and general electrical repairs.",
        price: 499,
        areas: ["Panchkula", "Chandigarh", "Zirakpur"],
    },
    {
        name: "Amit Kumar",
        email: "amit.plumber@localpro.test",
        phone: "9876500002",
        businessName: "Amit Plumbing Solutions",
        description: "Reliable plumbing services for homes, offices, and commercial properties.",
        city: "Chandigarh",
        state: "Chandigarh",
        pincode: "160017",
        experienceYears: 10,
        rating: 4.7,
        totalReviews: 98,
        serviceCategory: "plumber",
        serviceName: "Plumbing Repair",
        serviceDescription: "Leak repairs, tap installation, pipe repairs, and bathroom plumbing.",
        price: 399,
        areas: ["Chandigarh", "Panchkula", "Mohali"],
    },
    {
        name: "Vikram Singh",
        email: "vikram.ac@localpro.test",
        phone: "9876500003",
        businessName: "CoolCare AC Services",
        description: "AC installation, servicing, repair, and maintenance by experienced technicians.",
        city: "Mohali",
        state: "Punjab",
        pincode: "160055",
        experienceYears: 7,
        rating: 4.9,
        totalReviews: 156,
        serviceCategory: "ac-repair",
        serviceName: "AC Service",
        serviceDescription: "Complete AC servicing, cleaning, inspection, and basic repairs.",
        price: 599,
        areas: ["Mohali", "Chandigarh", "Zirakpur"],
    },
    {
        name: "Neha Verma",
        email: "neha.cleaning@localpro.test",
        phone: "9876500004",
        businessName: "Neha Home Care",
        description: "Professional home cleaning services with trained cleaning staff.",
        city: "Panchkula",
        state: "Haryana",
        pincode: "134112",
        experienceYears: 6,
        rating: 4.6,
        totalReviews: 87,
        serviceCategory: "home-cleaning",
        serviceName: "Deep Home Cleaning",
        serviceDescription: "Complete deep cleaning service for apartments and houses.",
        price: 1499,
        areas: ["Panchkula", "Chandigarh"],
    },
    {
        name: "Arjun Mehta",
        email: "arjun.carpenter@localpro.test",
        phone: "9876500005",
        businessName: "Arjun Woodworks",
        description: "Custom carpentry, furniture repair, installation, and woodwork services.",
        city: "Zirakpur",
        state: "Punjab",
        pincode: "140603",
        experienceYears: 12,
        rating: 4.8,
        totalReviews: 112,
        serviceCategory: "carpenter",
        serviceName: "Furniture Repair",
        serviceDescription: "Furniture repair, modification, assembly, and installation.",
        price: 699,
        areas: ["Zirakpur", "Panchkula", "Mohali"],
    },
    {
        name: "Priya Kapoor",
        email: "priya.makeup@localpro.test",
        phone: "9876500006",
        businessName: "Priya Beauty Studio",
        description: "Professional makeup artist specializing in party, bridal, and event makeup.",
        city: "Chandigarh",
        state: "Chandigarh",
        pincode: "160036",
        experienceYears: 9,
        rating: 4.9,
        totalReviews: 203,
        serviceCategory: "makeup-artist",
        serviceName: "Party Makeup",
        serviceDescription: "Professional makeup for parties, events, and special occasions.",
        price: 1999,
        areas: ["Chandigarh", "Panchkula", "Mohali"],
    },
    {
        name: "Rohan Gupta",
        email: "rohan.computer@localpro.test",
        phone: "9876500007",
        businessName: "Rohan Computer Care",
        description: "Computer and laptop repair, troubleshooting, upgrades, and maintenance.",
        city: "Panchkula",
        state: "Haryana",
        pincode: "134109",
        experienceYears: 5,
        rating: 4.5,
        totalReviews: 64,
        serviceCategory: "computer-repair",
        serviceName: "Laptop Repair",
        serviceDescription: "Laptop troubleshooting, software installation, and hardware repair.",
        price: 499,
        areas: ["Panchkula", "Chandigarh"],
    },
    {
        name: "Karan Malhotra",
        email: "karan.fitness@localpro.test",
        phone: "9876500008",
        businessName: "Karan Fitness Coaching",
        description: "Personal fitness coaching with customized workout programs.",
        city: "Mohali",
        state: "Punjab",
        pincode: "160062",
        experienceYears: 7,
        rating: 4.7,
        totalReviews: 91,
        serviceCategory: "fitness-trainer",
        serviceName: "Personal Training",
        serviceDescription: "One-to-one personal fitness training and workout planning.",
        price: 799,
        areas: ["Mohali", "Chandigarh"],
    },
    {
        name: "Simran Kaur",
        email: "simran.photography@localpro.test",
        phone: "9876500009",
        businessName: "Simran Photography",
        description: "Professional photography for events, portraits, birthdays, and weddings.",
        city: "Chandigarh",
        state: "Chandigarh",
        pincode: "160019",
        experienceYears: 8,
        rating: 4.9,
        totalReviews: 178,
        serviceCategory: "photographer",
        serviceName: "Event Photography",
        serviceDescription: "Professional photography coverage for events and celebrations.",
        price: 4999,
        areas: ["Chandigarh", "Panchkula", "Mohali"],
    },
];
async function main() {
    console.log("Seeding LocalPro database...");
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
    const passwordHash = await bcrypt.hash("Password123", 10);
    for (const providerData of providers) {
        const category = await prisma.category.findUnique({
            where: {
                slug: providerData.serviceCategory,
            },
        });
        if (!category) {
            throw new Error(`Category not found: ${providerData.serviceCategory}`);
        }
        const user = await prisma.user.upsert({
            where: {
                email: providerData.email,
            },
            update: {
                name: providerData.name,
                phone: providerData.phone,
                role: "PROVIDER",
            },
            create: {
                name: providerData.name,
                email: providerData.email,
                password: passwordHash,
                phone: providerData.phone,
                role: "PROVIDER",
            },
        });
        const provider = await prisma.providerProfile.upsert({
            where: {
                userId: user.id,
            },
            update: {
                businessName: providerData.businessName,
                description: providerData.description,
                city: providerData.city,
                state: providerData.state,
                pincode: providerData.pincode,
                experienceYears: providerData.experienceYears,
                verificationStatus: "VERIFIED",
                rating: providerData.rating,
                totalReviews: providerData.totalReviews,
                isAvailable: true,
            },
            create: {
                userId: user.id,
                businessName: providerData.businessName,
                description: providerData.description,
                city: providerData.city,
                state: providerData.state,
                pincode: providerData.pincode,
                experienceYears: providerData.experienceYears,
                verificationStatus: "VERIFIED",
                rating: providerData.rating,
                totalReviews: providerData.totalReviews,
                isAvailable: true,
            },
        });
        const existingService = await prisma.service.findFirst({
            where: {
                providerId: provider.id,
                categoryId: category.id,
                name: providerData.serviceName,
            },
        });
        if (existingService) {
            await prisma.service.update({
                where: {
                    id: existingService.id,
                },
                data: {
                    description: providerData.serviceDescription,
                    price: providerData.price,
                    isActive: true,
                },
            });
        }
        else {
            await prisma.service.create({
                data: {
                    providerId: provider.id,
                    categoryId: category.id,
                    name: providerData.serviceName,
                    description: providerData.serviceDescription,
                    price: providerData.price,
                    isActive: true,
                },
            });
        }
        for (const city of providerData.areas) {
            const existingArea = await prisma.serviceArea.findFirst({
                where: {
                    providerId: provider.id,
                    city,
                },
            });
            if (!existingArea) {
                await prisma.serviceArea.create({
                    data: {
                        providerId: provider.id,
                        city,
                        state: city === "Mohali"
                            ? "Punjab"
                            : city === "Chandigarh"
                                ? "Chandigarh"
                                : "Haryana",
                    },
                });
            }
        }
        console.log(`Seeded provider: ${providerData.businessName}`);
    }
    console.log(`Seeded ${providers.length} providers.`);
    console.log("LocalPro database seed completed.");
}
main()
    .catch((error) => {
    console.error("Database seed failed:", error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
