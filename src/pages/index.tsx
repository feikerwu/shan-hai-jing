import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { getTags, getTagColor } from '@/utils';
import Layout from '../components/Layout';
import styles from '@/styles/entry.module.scss';

// import usePostListByTag from '../hooks/usePostListByTag';

function filterByTag(lists: any[], tag: string) {
  if (tag === '') {
    return lists;
  }

  let filter = node =>
    node.frontmatter.tag === tag ||
    (node.frontmatter.tags && node.frontmatter.tags.indexOf(tag) !== -1);

  return lists.filter(filter);
}

export default ({ data }) => {
  const [tag, setTag] = useState('');
  const { allMarkdownRemark } = data;
  const nodes = filterByTag(allMarkdownRemark.nodes, tag);

  return (
    <div>
      <Layout>
        <div className={styles.blogList}>
          {nodes.map(node => (
            <PostEntry
              key={node.id}
              {...node.frontmatter}
              slug={node.fields.slug}
              id={node.id}
              desc={node.frontmatter.desc || node.excerpt}
              tags={getTags(node.frontmatter.tags || node.frontmatter.tag)}
              onTagClick={tag => setTag(tag)}
            ></PostEntry>
          ))}
        </div>
      </Layout>
    </div>
  );
};

const PostEntry = ({ title, date, tags, id, slug, desc, onTagClick }) => {
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
            key={tag}
            onClick={() => onTagClick(tag)}
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
