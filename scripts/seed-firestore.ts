/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
// Firestore Seed Script
// Run this with: npx ts-node scripts/seed-firestore.ts

const admin = require('firebase-admin');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

// SETUP INSTRUCTIONS:
// 1. Go to Firebase Console > Project Settings > Service Accounts
// 2. Click "Generate new private key"
// 3. Save the JSON file as 'serviceAccountKey.json' in the project root
// 4. Run: npx ts-node scripts/seed-firestore.ts

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

async function seedFirestore() {
    console.log('🌱 Seeding Firestore...\n');

    // Sample project ID (you should replace this with actual project IDs)
    const sampleProjectId = 'project_' + Date.now();
    const sampleClientId = '111929185368790584339'; // User's Firebase UID

    // 1. Create sample stations for tracking
    console.log('📍 Creating stations...');
    const stations = [
        { name: 'Requirements Received', status: 'completed', order: 1, updateNote: 'All requirements documented' },
        { name: 'Design Phase', status: 'completed', order: 2, updateNote: 'Design approved by client' },
        { name: 'Development Phase', status: 'active', order: 3, updateNote: 'Building frontend components' },
        { name: 'Review & Fixes', status: 'pending', order: 4, updateNote: '' },
        { name: 'Delivered', status: 'pending', order: 5, updateNote: '' },
    ];

    for (const station of stations) {
        await db.collection('buildstack_stations').add({
            projectId: sampleProjectId,
            clientId: sampleClientId,
            ...station,
            updatedAt: Timestamp.now(),
            createdAt: Timestamp.now(),
        });
    }
    console.log('✅ Stations created\n');

    // 2. Create sample invoice
    console.log('💰 Creating invoice...');
    await db.collection('buildstack_invoices').add({
        projectId: sampleProjectId,
        clientId: sampleClientId,
        invoiceNumber: 'INV-2026-001',
        amount: 25000,
        status: 'pending', // 'pending' or 'paid'
        pdfUrl: '',
        createdAt: Timestamp.now(),
    });
    console.log('✅ Invoice created\n');

    // 3. Create sample deliverable
    console.log('📦 Creating deliverable...');
    await db.collection('buildstack_deliverables').add({
        projectId: sampleProjectId,
        clientId: sampleClientId,
        previewUrl: 'https://preview.buildstack.com/sample-project',
        filesUrl: '',
        createdAt: Timestamp.now(),
    });
    console.log('✅ Deliverable created\n');

    // 4. Update/Create sample project (if needed)
    console.log('📁 Creating sample project...');
    await db.collection('buildstack_projects').doc(sampleProjectId).set({
        clientId: sampleClientId,
        name: 'Sample Business Website',
        websiteType: 'business',
        status: 'active',
        progress: 60,
        currentStage: 'Development Phase',
        email: 'vickynishad110@gmail.com',
        company: 'Buildstack',
        message: 'I need a modern business website',
        startDate: Timestamp.now(),
        estimatedDeliveryDate: Timestamp.fromDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)), // 14 days
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
    console.log('✅ Project created\n');

    // 5. Create Portfolio Items
    console.log('🌟 Creating portfolio items...');
    const portfolioItems = [
        {
            name: 'Dawakhana',
            description: 'A complete online pharmacy and healthcare platform with high-fidelity UI and medicine catalog.',
            link: 'https://dawakhana.netlify.app/',
            category: 'E-commerce & Healthcare',
            imageUrl: 'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=2070&auto=format&fit=crop',
            createdAt: Timestamp.now(),
        },
        {
            name: 'Buildstack Agency',
            description: 'Premium dark-themed agency platform with real-time project tracking and invoice management.',
            link: '/',
            category: 'SaaS & Agency',
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
            createdAt: Timestamp.now(),
        }
    ];

    for (const item of portfolioItems) {
        await db.collection('buildstack_portfolio').add(item);
    }
    console.log('✅ Portfolio items created\n');

    console.log('🎉 Seeding complete!\n');
    console.log('Collections created/updated:');
    console.log('  - buildstack_stations');
    console.log('  - buildstack_invoices');
    console.log('  - buildstack_deliverables');
    console.log('  - buildstack_projects');
    console.log('  - buildstack_portfolio');
    console.log('\nProject ID for tracking: ' + sampleProjectId);
}

seedFirestore().catch(console.error);
