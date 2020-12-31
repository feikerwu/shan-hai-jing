import React from 'react';
import { useAnchor } from '@hooks';
import style from './index.module.scss';

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ inline: 'nearest', behavior: 'smooth' });
}

const TOC = ({ headings }) => {
  const activeId = useAnchor(headings.map(heading => heading.id));
  const minDepth = headings.reduce(
    (acc, cur) => Math.min(acc, cur.depth),
    Infinity
  );

  return (
    <div className={style.tocWrapper}>
      <div className={style.toc}>
        {headings.map(item => (
          <div
            onClick={() => scrollTo(item.id)}
            className={item.id === activeId ? style.active : style.normal}
            key={item.id}
            style={{ paddingLeft: `${item.depth - minDepth + 1}em` }}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TOC;
