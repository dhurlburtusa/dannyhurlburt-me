module.exports = {
  plugins: [
    // Plugins:
    // --------
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Danny Hurlburt`,
        short_name: `Dan`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `content/assets/danny-hurlburt-icon.png`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    // Sources:
    // --------
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    // Transformers:
    // -------------
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
  ],
  siteMetadata: {
    author: {
      name: `Danny Hurlburt`,
      summary: `A senior full-stack engineer with over 15 years of experience.`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://dannyhurlburt.me/`,
    title: `Danny Hurlburt`,
  },
}
