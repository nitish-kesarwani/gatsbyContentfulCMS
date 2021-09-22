import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from 'gatsby-image'

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulBlog
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const date = new Date(post?.publishedDate)?.toLocaleDateString()
  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.title}
        description={post.subtitle}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{date}</p>
          <Img fluid={post?.image?.fluid} />
        </header>
        <section style={{margin:'40px 0'}}
          // dangerouslySetInnerHTML={{ __html: post.content.raw }}
          // itemProp="articleBody"
        >
          {post?.subtitle}
        </section>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlog( slug: { eq: $slug } ) {
      title
      subtitle
      author
      publishedDate
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      content {
        raw
      }
    }
  }
`
