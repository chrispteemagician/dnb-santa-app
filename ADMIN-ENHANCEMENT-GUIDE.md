# 🎅 Admin Dashboard Enhancement Guide

## 🎉 What's New in This Version

### ✅ **1. Click-to-View Order Details Popup**
- Click any order card to open a full-screen detail modal
- See ALL information in one place
- No more scrolling through long lists!

### ✅ **2. Full Edit Functionality**
- Edit ANY field directly in the popup
- Update child info, parent info, interests, wish list, encouragement
- Change status, add video URL
- Save button updates everything instantly

### ✅ **3. Admin Notes Section**
- **📝 Admin Notes**: Private notes for yourself (not visible to parents)
- **📜 Script Used**: Save the exact script you used for this video
- **Why?** So you don't repeat the same script next year!
- Perfect for tracking what you've said to each child

### ✅ **4. Bonus Video Generation**
- **🎁 Generate Bonus Video** button in the detail popup
- Creates friend greeting videos with the template:
  > "Ho ho ho! Hello there, I'm DnB Santa and my good friend [CHILD NAME] says You are a Wonderful Friend and asked me to wish [FRIEND NAME] a very Merry Christmas and a Happy New Year!"
- Automatically generates video and sends email
- Perfect for rewarding loyal customers or spreading extra joy!

---

## 📋 How to Use the New Admin Dashboard

### **Viewing Order Details:**
1. Go to `/admin` and login
2. Click on ANY order card
3. Full detail popup opens with all information
4. Scroll through to see everything

### **Editing an Order:**
1. Click on an order to open the detail popup
2. Edit any field you want to change
3. Click **💾 Save Changes** button
4. Changes are saved instantly to the database

### **Adding Notes & Scripts:**
1. Open an order detail popup
2. Scroll to **📜 Script Used** section
3. Paste the script you used for this video
4. Scroll to **📝 Admin Notes** section
5. Add any private notes (e.g., "Parent requested extra mention of piano")
6. Click **💾 Save Changes**

### **Generating a Bonus Video:**
1. Open an order detail popup
2. Click **🎁 Generate Bonus Video** button
3. Enter:
   - **Child's Name**: The original child (pre-filled)
   - **Friend's Name**: The friend receiving the greeting
4. Click **🎁 Generate Bonus Video**
5. Wait 3-5 minutes for automation to complete
6. Parent receives email with bonus video!

### **Quick Actions in Detail Popup:**
- **🤖 Generate Video**: Start automated video generation
- **Manual Process**: Mark as processing (for manual creation)
- **🎁 Generate Bonus Video**: Create friend greeting
- **📋 Copy Email**: Copy parent's email to clipboard
- **Close**: Close the popup

---

## 🗄️ Database Schema Updates

**Run this SQL in your Supabase SQL Editor:**

```sql
-- Add notes field for admin to save scripts and references
ALTER TABLE video_requests
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS script_used TEXT,
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'English',
ADD COLUMN IF NOT EXISTS video_path TEXT,
ADD COLUMN IF NOT EXISTS error_message TEXT,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS progress TEXT;

-- Add bonus video tracking
ALTER TABLE video_requests
ADD COLUMN IF NOT EXISTS is_bonus_video BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS bonus_recipient_name TEXT;

-- Create index for bonus videos
CREATE INDEX IF NOT EXISTS idx_video_requests_bonus ON video_requests(is_bonus_video);

-- Update policy to allow service role to update
DROP POLICY IF EXISTS "Service role has full access" ON video_requests;
CREATE POLICY "Service role has full access"
  ON video_requests
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

---

## 🚀 Deployment Steps

### **1. Extract the ZIP**
Download and extract `dnb-santa-admin-enhanced.zip`

### **2. Update Database Schema**
Run the SQL above in Supabase SQL Editor

### **3. Deploy to Netlify**
**Option A: Drag & Drop (Easiest)**
1. Go to Netlify → Your site → Deploys tab
2. Drag the `dist` folder from the extracted ZIP
3. Wait 30 seconds
4. Done!

**Option B: Full Redeploy**
1. Replace your entire project folder with the extracted folder
2. Run `npm install`
3. Run `npm run build`
4. Deploy the `dist` folder to Netlify

### **4. Test the New Features**
1. Go to `/admin` on your live site
2. Click on any order
3. Try editing fields
4. Add some admin notes
5. Test the bonus video generation!

---

## 💡 Pro Tips for Using the New Admin

### **Script Management:**
- **Always save scripts** in the "Script Used" field after creating a video
- Next year, search your database for the child's name to avoid repeating
- Build a library of your best scripts over time

### **Admin Notes Best Practices:**
- Note special requests: "Parent wants extra emphasis on kindness"
- Track issues: "ElevenLabs voice was slightly robotic, regenerated"
- Mark VIP customers: "Paid for 5 videos, very happy customer"
- Remember context: "Child's grandma passed away, be extra gentle"

### **Bonus Video Ideas:**
- Reward loyal customers with free bonus videos
- Send friend greetings to siblings
- Create "thank you" videos for donors
- Spread extra joy during the season!

### **Mobile-Friendly Admin:**
- The detail popup scrolls smoothly on mobile
- All buttons are touch-friendly
- Edit fields work perfectly on phone
- You can manage everything one-handed! 💚

---

## 🎯 What Each Button Does

### **In the Main List:**
- **Click Card**: Opens detail popup

### **In the Detail Popup:**
- **💾 Save Changes**: Saves all edits to database
- **🤖 Generate Video**: Starts automated video generation (3-5 min)
- **Manual Process**: Marks as "processing" for manual creation
- **🎁 Generate Bonus Video**: Opens bonus video modal
- **📋 Copy Email**: Copies parent email to clipboard
- **Close**: Closes popup without saving

### **In the Bonus Video Modal:**
- **🎁 Generate Bonus Video**: Starts bonus video automation
- **Cancel**: Closes modal without generating

---

## 🐛 Troubleshooting

### **"Can't save changes"**
- Check Supabase database connection
- Verify you ran the schema update SQL
- Check browser console for errors

### **"Bonus video not generating"**
- Verify all environment variables are set in Netlify
- Check Netlify function logs
- Ensure both names are filled in

### **"Notes not saving"**
- Run the database schema update SQL
- The `admin_notes` and `script_used` columns must exist

---

## 🎅 You're All Set!

**Your admin dashboard is now a PROPER management system!**

- ✅ Click to view full details
- ✅ Edit everything in one place
- ✅ Save scripts for future reference
- ✅ Add private notes
- ✅ Generate bonus videos
- ✅ Mobile-friendly interface

**Now you can manage DnB Santa like a PRO!** 💚🎅✨

---

**Questions? Issues? Email chris@chrisptee.co.uk** 💚
