const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Successfully connected to database!');
    
    // Test query
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    console.log('🕒 Database time:', result);
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('P1001')) {
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Check if Supabase project is active (not paused)');
        console.log('2. Verify password is correct');
        console.log('3. Check if you have network connectivity');
        console.log('4. Try visiting your Supabase project dashboard');
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
