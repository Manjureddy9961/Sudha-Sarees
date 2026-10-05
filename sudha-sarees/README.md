# Sudha Sarees
1. Create a Supabase project; run `supabase.sql` in the SQL editor.
2. Authentication > Users > add your admin email/password, then run the commented `insert into admins...` line from the SQL file.
3. `cp .env.example .env` and fill in the URL, anon key and shop phone (with country code, e.g. 919876543210).
4. `npm install && npm run dev`
5. Deploy: push to GitHub, import in Vercel, add the same 3 env vars. Add a `vercel.json` rewrite is included.
Admin: open Contact page, long-press (2s) the "Send message" button.
