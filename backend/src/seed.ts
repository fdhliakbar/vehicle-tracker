import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Sample vehicles data for Indonesia locations
  const vehicles = [
    {
      name: "Fleet Vehicle 001 - Jakarta",
      status: "ACTIVE" as const,
      fuel_level: 85.5,
      odometer: 45320.8,
      latitude: -6.2088,  // Jakarta
      longitude: 106.8456,
      speed: 45.2
    },
    {
      name: "Fleet Vehicle 002 - Bandung", 
      status: "INACTIVE" as const,
      fuel_level: 23.1,
      odometer: 67890.2,
      latitude: -6.9175,  // Bandung
      longitude: 107.6191,
      speed: 0
    },
    {
      name: "Fleet Vehicle 003 - Surabaya",
      status: "ACTIVE" as const,
      fuel_level: 92.8,
      odometer: 23456.7,
      latitude: -7.2575,  // Surabaya
      longitude: 112.7521,
      speed: 62.5
    },
    {
      name: "Fleet Vehicle 004 - Medan",
      status: "ACTIVE" as const,
      fuel_level: 67.3,
      odometer: 89123.4,
      latitude: 3.5952,   // Medan
      longitude: 98.6722,
      speed: 38.7
    },
    {
      name: "Fleet Vehicle 005 - Yogyakarta",
      status: "INACTIVE" as const,
      fuel_level: 12.8,
      odometer: 156789.1,
      latitude: -7.7956,  // Yogyakarta
      longitude: 110.3695,
      speed: 0
    },
    {
      name: "Fleet Vehicle 006 - Semarang",
      status: "ACTIVE" as const,
      fuel_level: 78.4,
      odometer: 98765.3,
      latitude: -7.0051,  // Semarang
      longitude: 110.4381,
      speed: 52.1
    }
  ];

  // Clear existing data
  await prisma.vehicle.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // Create vehicles
  for (const vehicle of vehicles) {
    await prisma.vehicle.create({
      data: vehicle
    });
  }
  console.log(`✅ Created ${vehicles.length} vehicles`);

  // Create users
  const saltRounds = 10;
  
  // Get passwords from environment variables or use defaults for development
  const adminPass = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';
  const userPass = process.env.DEFAULT_USER_PASSWORD || 'user123';
  const demoPass = process.env.DEFAULT_DEMO_PASSWORD || 'demo123';
  
  // Admin user
  const adminPassword = await bcrypt.hash(adminPass, saltRounds);
  await prisma.user.create({
    data: {
      email: 'admin@widya.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN'
    }
  });
  console.log('✅ Created admin user (email: admin@widya.com, password: [HIDDEN])');

  // Regular user
  const userPassword = await bcrypt.hash(userPass, saltRounds);
  await prisma.user.create({
    data: {
      email: 'user@widya.com',
      password: userPassword,
      name: 'Regular User',
      role: 'USER'
    }
  });
  console.log('✅ Created regular user (email: user@widya.com, password: [HIDDEN])');

  // Demo user
  const demoPassword = await bcrypt.hash(demoPass, saltRounds);
  await prisma.user.create({
    data: {
      email: 'demo@widya.com',
      password: demoPassword,
      name: 'Demo User',
      role: 'USER'
    }
  });
  console.log('✅ Created demo user (email: demo@widya.com, password: [HIDDEN])');

  console.log('🎉 Seed completed successfully!');
  console.log('\n📋 Available test accounts:');
  console.log('👑 Admin: admin@widya.com / [check .env or default: admin123]');
  console.log('👤 User: user@widya.com / [check .env or default: user123]');
  console.log('🎭 Demo: demo@widya.com / [check .env or default: demo123]');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
