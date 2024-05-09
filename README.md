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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# TODO List

## Marker Features
- **POST Route for Creating New Markers (Logged-in Users Only)**:
  - Create a POST route for adding new markers.
  - Ensure that this route is restricted to logged-in users.
  - Implement proper validation and authentication.
- **PUT Route for Updating Markers (Owners Only)**:
  - Implement a PUT route for updating existing markers.
  - Ensure that this route requires an authenticated session and that the user is the owner of the marker/shelter.
  - Implement checks to confirm ownership before allowing updates.
- **GET Markers for Editing**:
  - Implement a route to get the list of markers in a table or list format.
  - Reference for UI design: [ShadCN Data Table](https://ui.shadcn.com/docs/components/data-table).
  - Ensure this route is accessible only to users with editing permissions.

- **Adjust Marker Visualization to Show Occupied and Available Vacancies**:
  - Update the visualization to clearly distinguish between occupied and available vacancies.
  - Consider adding a legend or using different colors to indicate the status.

## Access Control and User Management
- **Disable Public Registration Route or Create a Private Route for User Registration**:
  - Disable the public registration route to prevent unauthorized user creation.
  - Create a private route exclusively for API or ADMIN user to  managers to register new users.
  - Ensure the private route is protected by appropriate authentication and authorization.

- **Transfer Shelter Ownership to Responsible Users**:
  - Update ownership logic to assign shelters to specific responsible users instead of all shelters being under the admin user. (Could be directly in the Database or with prisma studio)
  - Ensure only responsible users have full control over their respective shelter.

