export function getTags(tags: string | null) {
  return tags ? tags.split(',').map(tag => tag.trim()) : [];
}

const getRandomColor = () => {
  const colors = [
    '#000000',
    '#343a40',
    '#495057',
    '#c92a2a',
    '#a61e4d',
    '#862e9c',
    '#5f3dc4',
    '#364fc7',
    '#1864ab',
    '#0b7285',
    '#087f5b',
    '#2b8a3e',
    '#5c940d',
    '#e67700',
    '#d9480f',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const tagColorMaps = localStorage
  ? JSON.parse(localStorage.getItem('tagColorMaps') || '{}')
  : {};

export function getTagColor(tag: string) {
  if (tagColorMaps[tag]) {
    return tagColorMaps[tag];
  }

  tagColorMaps[tag] = getRandomColor();

  if (localStorage) {
    localStorage.setItem('tagColorMaps', JSON.stringify(tagColorMaps));
  }

  return tagColorMaps[tag];
}
