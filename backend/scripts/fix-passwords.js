const bcrypt = require('bcrypt');
const db = require('../config/database');

async function fixPasswords() {
  try {
    console.log('🔧 Memperbaiki password users...\n');

    // Hash password yang benar
    const adminPassword = await bcrypt.hash('admin123', 10);
    const panitiaPassword = await bcrypt.hash('panitia123', 10);

    console.log('Generated hashes:');
    console.log('Admin password hash:', adminPassword);
    console.log('Panitia password hash:', panitiaPassword);
    console.log('');

    // Update admin password
    await db.query(
      'UPDATE users SET password = ? WHERE username = ?',
      [adminPassword, 'admin']
    );
    console.log('✅ Password admin updated');

    // Update panitia password
    await db.query(
      'UPDATE users SET password = ? WHERE username = ?',
      [panitiaPassword, 'panitia1']
    );
    console.log('✅ Password panitia1 updated');

    // Verify
    console.log('\n🔍 Verifikasi...');
    const [users] = await db.query('SELECT username, password FROM users');
    
    for (const user of users) {
      const testPassword = user.username === 'admin' ? 'admin123' : 'panitia123';
      const isValid = await bcrypt.compare(testPassword, user.password);
      console.log(`${user.username}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    }

    console.log('\n✅ Selesai! Password sudah diperbaiki.');
    console.log('\nCredentials:');
    console.log('Admin: admin / admin123');
    console.log('Panitia: panitia1 / panitia123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixPasswords();
