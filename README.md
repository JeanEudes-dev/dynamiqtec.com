# dynamiqtec.com

A modern multilingual blog and portfolio built with Next.js, Contentlayer, and Tailwind CSS.

## Features

- ✍️ Write posts in Markdown/MDX (supports English and French)
- 🌍 Multilingual routing (English & French)
- 🏷️ Blog, projects, and about pages
- ⚡ Fast, SEO-friendly, and mobile responsive
- 🖼️ Dynamic Open Graph images
- 🔍 Search and post navigation
- 🎨 Styled with Tailwind CSS
- 🗂️ Content managed with Contentlayer

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Content Structure

- `posts/` — Blog posts in MDX (e.g., `my-post.en.mdx`, `my-post.fr.mdx`)
- `app/` — Next.js app directory (routing, pages)
- `components/` — React components
- `public/` — Static assets (images, etc.)
- `styles/` — Global styles (Tailwind CSS)

## Adding a New Post

1. Create a new `.mdx` file in the `posts/` folder.
2. Use the following frontmatter:
   ```md
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DDTHH:MM:SSZ"
   author: "Your Name"
   coverImage: "your-image.png"
   description: "Short description of the post."
   ---
   ```
3. Write your content below the frontmatter.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run translate` — Run translation script (see `scripts/translate.js`)

## License

This project is licensed under the MIT License.
