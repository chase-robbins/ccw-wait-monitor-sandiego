# San Diego CCW Appointment Wait Time Monitor

This project is a website created with [Next.js](https://nextjs.org/) to monitor the current wait time for obtaining a Concealed Carry Weapon (CCW) appointment in San Diego County. The site was developed out of necessity during the creator's own CCW application process.

## Live Website

You can access the live website at: [https://ccwwait-sandiego.onrender.com/](https://ccwwait-sandiego.onrender.com/)

## Features

- Real-time monitoring of CCW appointment wait times in San Diego County
- Data sourced from a web scraper monitoring the CCW scheduling portal
- Backend hosted through Retool for simplicity

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

This project requires the following environment variables:

```
NEXT_PUBLIC_RETOOL_API_URL=https://api.retool.com/v1/workflows/3935900e-8c0f-468c-a654-f57b4fb71d0c/startTrigger
NEXT_PUBLIC_RETOOL_API_KEY=retool_wk_1910f7c3860644c1a6f119af738dc984
```

Make sure to add these to your `.env` file before running the project.

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Contributing

Contributions to improve this project are welcome. Please feel free to submit issues or pull requests.

## Deployment

This project is deployed on [Render](https://render.com/). For more information on deploying Next.js apps, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License - see the [LICENSE](LICENSE) file for details.

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
