// scripts/runSeed.js
const insertData = require('../scripts/insert');

insertData()
  .then(() => {
    console.log('✅ Data seeded successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Failed to seed data:', err);
    process.exit(1);
  });
