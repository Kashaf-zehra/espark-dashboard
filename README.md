This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel  

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Branching and Merging Process:

### Epic Branch Creation:

- When starting work on a new epic, create an epic branch from the development branch.
- Naming Convention: epic/issues/issue-no, 
```bash
e.g., epic/issues/3.
```

### Feature Branch Creation:

- For tasks related to an epic, create a feature branch from the corresponding epic branch.
- Perform all development work related to the feature in this branch.
- Naming Convention:
```bash
 feature/issues/issue-number,
e.g., feature/issues/5.
```

### Testing and QA:

- Once the feature is developed and tested, create a Build and provide it to the QA team.
- QA verifies the feature for functionality and quality.

### Pull Request (PR) Creation:

- After QA verification, create a Pull Request (PR) to merge the feature branch into the corresponding epic branch.
- The PR undergoes code review and approval from TL/ Dev Lead.

### Epic Completion:

- If the epic's tasks are complete, create a Build of the entire epic's features and send it to QA for final verification.

### Epic PR with Development:

- Create a PR to merge the epic branch into the development branch.
- This step ensures that the completed epic is integrated into the development branch.

### BUg/Hot Fix Branch Creation:

- If a minor issue is found in the development branch, 
create a hotfix branch & fix within this branch.

```bash
- Naming Convention: hotfix/issues/issue-no,
- e.g., hotfix/issues/4.
```

- If a bug is found in the development branch, 
create a bugfix branch.- Fix the bug within this branch.

```bash
- Naming Convention: bugfix/issues/issue-no,
- e.g., bugfix/issues/4.
```

### Bug Fix Resolved & Merged PR within Development:

- After fixing the bug, create a PR to merge the hotfix branch into the development branch.
- The fix is then incorporated into the development codebase.

### QA and Epic Bugs:

- If bugs are found in the epic branch during QA, follow the same process as with development bugs.
- Create a bug fix branch, fix the bug, and create a PR to merge it into the corresponding epic branch.

### Final Epic Integration:

- Once all tasks within the epic are completed and verified, create a final APK and send it to QA for comprehensive testing.
- Epic PR with Development (Final):

Create a PR to merge the fully verified epic branch into the development branch.
This ensures that the entire epic is successfully integrated into the project's main development codebase.
By following this branching and merging process, you ensure a structured and organized approach to feature development, bug fixing, and the integration of epics into the development codebase. This methodology helps maintain code quality, collaboration, and the smooth progression of your project.
