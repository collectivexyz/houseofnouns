## Getting Started

For now, this repository uses hosted APIs from House of Nouns (https://api.houseofnouns.wtf). We'll be progressively open-sourcing more of this after the frontend release is stable.

To get started, clone this repository and create a file called .env containing the defaults in .env.example. These point to our public Mongo cluster that contain read-only data around proposals, comments, and other metadata.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributions

We accept contributions via pull requests. We'll soon be maintaining a list of bounties and contribution requests.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn/foundations/about-nextjs) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_source=github.com&utm_medium=referral&utm_campaign=turborepo-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
