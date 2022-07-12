/**
 * 获取部分数据
 * @param data
 * @param fileds
 * @returns
 */
export const partial = (data: Record<string, any>, fileds: string[]) => {
  const partialData: Partial<typeof data> = {};
  for (let filed of fileds) {
    partialData[filed] = data[filed];
  }
  return partialData;
};
