/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import svgGithub from '../assets/icons/logo-github.svg';
import svgFriend from '../assets/icons/icon-friend-link.svg';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  // const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed;

  return (
    <div className='bio'>
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className='bio-avatar'
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <p>
          <strong>{author.name}</strong> {author?.summary || null}
          {` `}
        </p>
      )}
      <div className={'social-links'}>
        <a href={`https://github.com/feikerwu/shan-hai-jing`}>
          <img src={svgGithub} alt='' className={'svg-logo'} />
        </a>

        <a href={'/friends'}>
          <img src={svgFriend} alt='' className={'svg-logo'} />
        </a>
      </div>
    </div>
  );
};

export default Bio;
