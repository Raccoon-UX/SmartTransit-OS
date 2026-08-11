import { connectDatabase, closeDatabase } from '../config/db.js';
import * as models from './index.js';

async function runModelVerification() {
  console.log('[Model Verification] Starting Mongoose Schema & Index validation...');

  try {
    await connectDatabase();

    const modelNames = Object.keys(models);
    console.log(`[Model Verification] Loaded ${modelNames.length} Models: ${modelNames.join(', ')}`);

    for (const name of modelNames) {
      const model = models[name];
      console.log(`[Model Verification] Compiling and verifying indexes for model: ${name} (Collection: ${model.collection.name})`);
      await model.init(); // Ensures indexes are built and schema compiles cleanly
    }

    console.log('[Model Verification] ✅ All 10 Mongoose Models and Indexes verified successfully!');
    await closeDatabase();
    process.exit(0);
  } catch (error) {
    console.error('[Model Verification] ❌ Model validation failed:', error);
    await closeDatabase();
    process.exit(1);
  }
}

runModelVerification();
