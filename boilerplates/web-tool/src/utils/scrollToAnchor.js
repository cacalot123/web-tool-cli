/***
 * react H5锚点跳转
 * @function scrollToAnchor
 * @param anchorName 锚点id
 * ***/

const scrollToAnchor = (anchorName) => {
  if (anchorName) {
    // 找到锚点
    const anchorElement = document.getElementById(anchorName);
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) {
      anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'});
    }
  }
};
export {scrollToAnchor};

export default scrollToAnchor;
