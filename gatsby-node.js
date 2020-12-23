const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({
  actions: { createPage },
  graphql,
  reporter,
}) => {
  // Define a template for blog post
  const BlogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id
      const previousPostId = index === 0 ? null : posts[index - 1].id

      createPage({
        path: post.fields.slug,
        component: BlogPost,
        context: {
          id: post.id,
          nextPostId,
          previousPostId,
        },
      })
    })
  }
}

exports.onCreateNode = ({ actions: { createNodeField }, getNode, node }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ getNode, node })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
    }

    type Author {
      name: String
      summary: String
    }

    type MarkdownRemark implements Node {
      fields: Fields
      frontmatter: Frontmatter
    }

    type Frontmatter {
      date: Date @dateformat
      description: String
      title: String
    }

    type Fields {
      slug: String
    }
  `)
}
