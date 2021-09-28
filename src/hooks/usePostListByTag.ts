import { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

// const lists = useStaticQuery();

export default (tag: string) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, [tag]);
  return { posts };
};
