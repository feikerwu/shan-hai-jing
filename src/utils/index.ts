export function getTags(tags: string | null) {
  return tags ? tags.split(',').map(tag => tag.trim()) : [];
}

const getRandomColor = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16);

const tagColorMaps = {};
export function getTagColor(tag: string) {
  if (tagColorMaps[tag]) {
    return tagColorMaps[tag];
  }

  tagColorMaps[tag] = getRandomColor();

  return tagColorMaps[tag];
}
