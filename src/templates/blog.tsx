import { CalendarIcon } from '@heroicons/react/outline';
import { FireIcon } from '@heroicons/react/solid';
import { graphql } from 'gatsby';
import React from 'react';
import dayjs from 'dayjs';

import Layout from '../components/Layout';

// import styles from '../pages/journal.module.scss';
import style from './index.module.scss';

const ArticlePage = props => {
  const { fields, frontmatter, html } = props.data.markdownRemark;

  return (
    <Layout>
      <div className={style.post}>
        <div className={style.header}>
          <div className={style.title}>{frontmatter.title.toLowerCase()}</div>
          <div className={style.date}>
            <CalendarIcon className={style.dateIcon} />
            {dayjs(frontmatter.date).format('YYYY-MM-DD')}
          </div>
        </div>
        <div
          className={style.content}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  );
};

export default ArticlePage;

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        tags
      }
    }
  }
`;
