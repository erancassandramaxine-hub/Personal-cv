# Cassandra Maxine J. Eran | Personal CV Website

A responsive personal CV and portfolio for **Cassandra Maxine J. Eran**, a college student and aspiring web developer. It includes profile, education, skills, sample projects, experience, achievements, and contact sections.

**Live Vercel site:** `https://YOUR_PROJECT.vercel.app`

## Technologies

- HTML5 with semantic landmarks
- CSS3 with custom properties, Grid, Flexbox, and responsive layouts
- Vanilla JavaScript with IntersectionObserver and localStorage
- Google Fonts: Manrope and DM Sans

No framework, library, package manager, or build step is needed.

## Folder structure

```text
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── profile.jpg              # Cassandra's original portrait
│   ├── project-portfolio.svg    # Replace with a real project screenshot
│   ├── project-dashboard.svg    # Replace with a real project screenshot
│   └── project-library.svg      # Replace with a real project screenshot
└── README.md
```

## Make it yours

1. Search the project for `YOUR_` and replace every placeholder with your real details, links, education, and achievements.
2. Replace the three sample projects with projects you actually completed. Update their descriptions, technology tags, category, repository links, and live demo links. The current project illustrations are clearly labeled concept placeholders.
3. The original portrait is included as `assets/profile.jpg`. To replace it later, use `profile.jpg`, `profile.jpeg`, `profile.png`, or `profile.webp`; the hero displays **CE** initials if the file is missing.
4. Review the skill percentages; they are illustrative self-assessments.
5. Open `index.html` in a browser. Internet access is needed to load the Google Fonts; system font fallbacks are included.

## Suggested Git commits

Use these messages as milestones while you make and review the corresponding changes. Do not create empty or misleading commits just to fill the history.

1. `Add semantic HTML structure for CV sections`
2. `Create responsive navigation and profile hero`
3. `Style education and basic information sections`
4. `Add technical and professional skill meters`
5. `Build project cards and category filters`
6. `Add experience and achievement sections`
7. `Implement theme toggle and scroll interactions`
8. `Add project preview artwork and image fallback`
9. `Improve keyboard access and reduced motion support`
10. `Document setup and deployment in README`

## Push to GitHub

1. Create an empty repository on GitHub. Do not add a README there because this project already has one.
2. Open a terminal in this project folder.
3. Run `git init` if this is not already a Git repository.
4. Run `git add .` and `git commit -m "Add personal CV website"`. If you develop in stages, use the suggested commit messages above as you complete each stage.
5. Run `git branch -M main`.
6. Run `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git`, replacing both placeholders.
7. Run `git push -u origin main`. If GitHub asks you to authenticate, follow its sign-in prompt.

## Deploy to Vercel

1. Sign in to Vercel and choose **Add New → Project**.
2. Import the GitHub repository you just pushed.
3. Choose **Other** as the framework preset. Leave the build command blank and use the repository root as the output directory.
4. Select **Deploy**. Vercel will serve the root `index.html` as a static site.
5. Copy the deployment URL into this README and replace the live demo placeholders in `index.html` where appropriate.
6. Commit and push the updated links to trigger a new deployment.

## Final checks

- [ ] Replace every `YOUR_` placeholder and every sample claim that is not yours.
- [ ] Open every GitHub, LinkedIn, Facebook, Instagram, project, email, and phone link.
- [ ] Confirm the profile photo or CE fallback and all project images display.
- [ ] Try every project filter and the light/dark toggle; reload to check theme memory.
- [ ] Test the mobile menu, active navigation, back-to-top button, and keyboard focus.
- [ ] Check phone, tablet, laptop, and desktop widths for readable text and no horizontal overflow.
- [ ] Check reduced-motion mode and verify animations do not distract.
