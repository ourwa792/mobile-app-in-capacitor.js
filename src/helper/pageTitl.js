export const setTitl = (title)=> {
  document.getElementById("title").textContent = title
}

export const toggleBottomBar = (isVisible) => {
  const bottomBar = document.getElementById('bottomBar');
  if (bottomBar) {
    bottomBar.style.display = isVisible ? 'block' : 'none'; // عرض bottomBar إذا كانت الجلسة نشطة
  }
};
  
