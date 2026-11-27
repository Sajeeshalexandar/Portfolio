# Sajeesh Alexandar - Web Developer Portfolio

Personal portfolio website showcasing web development projects, skills, and interactive experiences.

## 🚀 Features

- **Responsive Design**: Modern UI/UX with smooth animations and mobile support.
- **Interactive Projects**: Showcases various web apps and games.
- **Automated Email Contact Service**:
  - Direct message forwarding to `sajeeshalexander@gmail.com`.
  - Instant branded thank-you / confirmation email sent to the visitor.
  - Form validation with real-time status feedback (loading spinner, success, and error alerts).

---

## 🛠️ Local Development & Running the Email Service

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   A `.env` file contains your credentials (protected by `.gitignore` so your App Password is never exposed publicly):
   ```env
   PORT=5000
   EMAIL_USER=sajeeshalexander@gmail.com
   EMAIL_PASS=<your-gmail-app-password>
   ```

3. **Start the local server**:
   ```bash
   npm start
   ```
   Open [http://localhost:5000](http://localhost:5000) in your browser. The contact form will submit to `/api/contact`, send you the message, and send an automated thank-you note to the visitor.

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Free & 1-Click)
1. Push your repository to GitHub (the `.env` file is protected and won't be pushed).
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"** -> import your GitHub repository.
3. In **Environment Variables**, add:
   - `EMAIL_USER`: `sajeeshalexander@gmail.com`
   - `EMAIL_PASS`: `jekazfmoixrixojk`
4. Click **Deploy**. Vercel will host both your portfolio and the serverless email API (`api/contact.js`) seamlessly!

### Option 2: Render.com / Railway (Deploy Backend with GitHub Pages)
If you keep hosting the static HTML on GitHub Pages:
1. Deploy `server.js` to [Render](https://render.com/) or [Railway](https://railway.app/) as a Web Service.
2. Add the environment variables `EMAIL_USER` and `EMAIL_PASS` in your service settings.
3. Once deployed, copy your service URL (e.g. `https://sajeesh-portfolio-api.onrender.com`).
4. In `index.html`, set `window.PORTFOLIO_API_URL` to your live endpoint:
   ```javascript
   window.PORTFOLIO_API_URL = 'https://sajeesh-portfolio-api.onrender.com/api/contact';
   ```
