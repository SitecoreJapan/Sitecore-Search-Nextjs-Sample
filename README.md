# Sitecore Search Next.js Sample

A website built using Next.js + Sitecore Search SDK for React

Next.js sample application with Sitecore Search

This sample is running on https://sitecore-search-nextjs-sample.vercel.app/

## Prerequisites

### Node.js

The Search Starter Kit needs to have Node.js installed to build the project. We recommend using the LTS version of Node.js. You can find the latest version of Node.js [here](https://nodejs.org/en/).

### Environment variables

Please set following variables from Sitecore Search development resource.

```
NEXT_PUBLIC_SEARCH_ENV=<environment - Expected values: prod, staging, prodEu or apse2 >
NEXT_PUBLIC_SEARCH_CUSTOMER_KEY=<customer key>
NEXT_PUBLIC_SEARCH_API_KEY=<API key provided in CEC>
NEXT_PUBLIC_SEARCH_PATH=<Path for the site>. This variable is optional, use it only if the site domain also includes an extra path.
```

## Quick start

To start using `Sitecore Search Next.js Sample`:

1. Install [Node.js](htts://nodejs.org/en/). We recommend the LTS version.
2. Clone the repository: `git clone git@github.com:SitecoreJapan/Sitecore-Search-Nextjs-Sample.git`.
3. In the repository, to install all dependencies, run `npm install`.
4. In the root of the project, create a `.env` file
5. To start the development server, run `npm run dev`.
6. To view the site, open your browser to **http://localhost:3000**
7. To build the app for production, run: `npm run build`
