# Environment Variables Setup

This project uses environment variables to securely store sensitive API keys and configuration. The credentials are stored in a `.env` file which is gitignored to prevent them from being committed to version control.

## Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your credentials:**
   Open `.env` and replace the placeholder values with your actual credentials:
   
   - **Supabase:**
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   
   - **Firebase:**
     - `VITE_FIREBASE_API_KEY`: Your Firebase API key
     - `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
     - `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
     - `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
     - `VITE_FIREBASE_APP_ID`: Your Firebase app ID
     - `VITE_FIREBASE_MEASUREMENT_ID`: Your Firebase measurement ID

3. **Restart the development server:**
   ```bash
   npm run dev
   ```

## Important Notes

- **Never commit `.env`** to version control. It contains sensitive credentials.
- The `.env.example` file is safe to commit as it only contains placeholders.
- All environment variables must be prefixed with `VITE_` to be accessible in Vite applications.
- After changing `.env`, you must restart the dev server for changes to take effect.

## Files Using Environment Variables

- `src/Firebase/firebase.js` - Firebase configuration
- `src/pages/Report.jsx` - Supabase client
- `src/pages/Map.jsx` - Supabase client
