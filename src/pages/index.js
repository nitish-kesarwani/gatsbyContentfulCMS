import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from 'gatsby-image'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulBlog.edges
  console.log('posts', posts)
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(({node}, index) => {
          const title = node?.title || node?.slug

          return (
            <li key={node?.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={node?.slug} itemProp="url">
                      <span itemProp="headline">{++index})&nbsp;{title}</span>
                    </Link>
                  </h2>
                  <Img fluid={node?.image?.fluid} style={{margin:'30px 0'}} />
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <small>{new Date(node?.publishedDate)?.toLocaleDateString()}</small>
                    <small> Author: {node?.author}</small>
                  </div>
                </header>
                <section>
                  {/* <p
                    dangerouslySetInnerHTML={{
                      __html: post.content.raw,
                    }}
                    itemProp="description"
                  /> */}
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlog {
      edges {
        node {
          title
          subtitle
          author
          slug
          publishedDate
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
