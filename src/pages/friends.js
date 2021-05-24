import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import '../styles/friends.scss';

const aLinks = [
  {
    name: 'lucifer 的网络博客',
    link: 'https://lucifer.ren/blog/',
    avatar:
      'https://tva1.sinaimg.cn/large/006tNbRwly1ga7ognflh9j30b40b4q3w.jpg',
    desc: '一个脑洞很大的程序员，Github 30K LeetCode 项目，公众号《脑洞前端》',
  },
];

const FriendLinkItem = ({ avatar, name, desc, link }) => {
  return (
    <div className='friend' onClick={() => window.open(link)}>
      <img src={avatar} className='avatar' />
      <div>
        <h3>{name}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ({ data, location }) => {
  const [links] = useState(aLinks);
  const title = data.site.siteMetadata.title;
  return (
    <Layout location={location} title={title}>
      <div className='friends-list'>
        {links.map((item) => (
          <FriendLinkItem
            key={item.avatar}
            link={item.link}
            avatar={item.avatar}
            name={item.name}
            desc={item.desc}
          ></FriendLinkItem>
        ))}
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
