import React from 'react';
import { graphql, Link } from 'gatsby';
import { getTags, getTagColor } from '@/utils';
import Layout from '../components/Layout';
import styles from '@/styles/entry.module.scss';

export default ({ data }) => {
  const { allMarkdownRemark } = data;
  const { nodes } = allMarkdownRemark;

  return (
    <div>
      <Layout>
        <div className={styles.blogList}>
          {nodes.map(node => (
            <PostEntry
              {...node.frontmatter}
              slug={node.fields.slug}
              id={node.id}
              desc={node.frontmatter.desc || node.excerpt}
              tags={getTags(node.frontmatter.tags || node.frontmatter.tag)}
            ></PostEntry>
          ))}
        </div>
      </Layout>
    </div>
  );
};

const PostEntry = ({ title, date, tags, id, slug, desc }) => {
  return (
    <div className={styles.entry}>
      <Link to={slug} className={styles.titleWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.date}>{date}</div>
      </Link>
      <div className={styles.desc}>{desc}</div>
      <div className={styles.tags}>
        {tags.map(tag => (
          <span
            className={styles.tag}
            style={{ backgroundColor: getTagColor(tag) }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query allPosts {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/^(?!.*daily).*$/i" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          desc
          tags
          tag
          title
        }
        id
        excerpt
      }
    }
  }
`;
