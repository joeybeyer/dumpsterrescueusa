import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get all leads
  const allLeads = await prisma.lead.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  console.log(`\n=== ALL LEADS IN DATABASE (${allLeads.length} total) ===\n`);

  // Also get leads from last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentLeads = allLeads.filter(l => new Date(l.createdAt) >= sevenDaysAgo);

  console.log(`Last 7 days: ${recentLeads.length} leads\n`);

  // Show all leads, not just recent ones
  const leads = allLeads;
  const validLeads = leads.filter(l => !l.spam);
  const spamLeads = leads.filter(l => l.spam);

  console.log(`✅ Valid Leads: ${validLeads.length}`);
  console.log(`🚫 Spam Leads: ${spamLeads.length}\n`);

  if (validLeads.length > 0) {
    console.log('--- VALID LEADS ---\n');
    validLeads.forEach((lead, index) => {
      console.log(`${index + 1}. ${lead.name}`);
      console.log(`   Email: ${lead.email}`);
      console.log(`   Phone: ${lead.phone || 'N/A'}`);
      console.log(`   Location: ${lead.city || 'N/A'}, ${lead.state || 'N/A'} ${lead.zipCode || ''}`);
      console.log(`   Project: ${lead.projectType || 'N/A'}`);
      console.log(`   Dumpster Size: ${lead.dumpsterSize || 'N/A'}`);
      console.log(`   Source: ${lead.source || 'N/A'}`);
      console.log(`   Submitted: ${lead.createdAt.toLocaleString()}`);
      console.log('');
    });
  }

  if (spamLeads.length > 0) {
    console.log('--- SPAM LEADS (Filtered Out) ---\n');
    spamLeads.forEach((lead, index) => {
      console.log(`${index + 1}. ${lead.name} - ${lead.email}`);
      console.log(`   Reason: ${lead.spamReason}`);
      console.log(`   Submitted: ${lead.createdAt.toLocaleString()}`);
      console.log('');
    });
  }

  if (leads.length === 0) {
    console.log('No leads found in the last 7 days.\n');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
