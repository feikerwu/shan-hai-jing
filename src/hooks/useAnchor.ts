import React, { useState, useEffect } from 'react';

/**
 * 获取当前锚点id
 * @param anchorsId 锚点ids
 */
const useAnchor = (anchorsId: string[]) => {
  const [activeAnchor, setActiveAnchor] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveAnchor(entry.target.id);
        }
      });
    });

    forEach(anchorsId, id => observer.observe(document.getElementById(id)));

    return () =>
      forEach(anchorsId, id => observer.unobserve(document.getElementById(id)));
  }, []);

  return activeAnchor;
};

/**
 * 对一个可遍历对象每一个元素操作
 * @param iterator 可遍历对象
 * @param func 操作函数
 */
function forEach<T>(iterator: Iterable<T>, func: (args: T) => unknown): void {
  for (let val of iterator) {
    func(val);
  }
}

export default useAnchor;
