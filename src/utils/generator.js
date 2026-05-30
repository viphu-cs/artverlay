// Visual-to-Code Generator for Artverlay

export const generateLayerCode = (config) => {
  const {
    shape = 'brutal-box',
    text = '',
    fontFamily = 'Space Grotesk',
    fontSize = 24,
    textColor = '#ffffff',
    bgColor = '#ff6b9d',
    borderColor = '#000000',
    borderWidth = 4,
    borderRadius = 8,
    shadowColor = '#000000',
    shadowOffset = 4,
    rows = 3,
    cols = 3,
    gridGap = 8
  } = config;

  let html = '';
  let css = '';

  // Base styling for the primary visual element
  const baseStyles = `
  background-color: ${bgColor};
  border: ${borderWidth}px solid ${borderColor};
  color: ${textColor};
  font-family: '${fontFamily}', sans-serif;
  font-size: ${fontSize}px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
  `;

  if (shape === 'circle') {
    html = `<div class="brutal-shape circle">${text}</div>`;
    css = `.circle {
  ${baseStyles}
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: ${shadowOffset}px ${shadowOffset}px 0px ${shadowColor};
}`;
  } else if (shape === 'square') {
    html = `<div class="brutal-shape square">${text}</div>`;
    css = `.square {
  ${baseStyles}
  width: 180px;
  height: 180px;
  border-radius: ${borderRadius}px;
  box-shadow: ${shadowOffset}px ${shadowOffset}px 0px ${shadowColor};
}`;
  } else if (shape === 'brutal-box') {
    html = `<div class="brutal-shape brutal-box">${text}</div>`;
    css = `.brutal-box {
  ${baseStyles}
  padding: 20px 40px;
  border-radius: ${borderRadius}px;
  box-shadow: ${shadowOffset}px ${shadowOffset}px 0px ${shadowColor};
}`;
  } else if (shape === 'triangle') {
    html = `<div class="brutal-shape triangle-wrap">
  <div class="triangle-content">${text}</div>
</div>`;
    css = `.triangle-wrap {
  width: 200px;
  height: 200px;
  background-color: ${bgColor};
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
}
.triangle-content {
  color: ${textColor};
  font-family: '${fontFamily}', sans-serif;
  font-size: ${fontSize}px;
  font-weight: 800;
}`;
  } else if (shape === 'star') {
    html = `<div class="brutal-shape star-wrap">
  <div class="star-content">${text}</div>
</div>`;
    css = `.star-wrap {
  width: 200px;
  height: 200px;
  background-color: ${bgColor};
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.star-content {
  color: ${textColor};
  font-family: '${fontFamily}', sans-serif;
  font-size: ${fontSize}px;
  font-weight: 800;
}`;
  } else if (shape === 'table' || shape === 'grid') {
    const cellCount = rows * cols;
    let cellHtml = '';
    for (let i = 1; i <= cellCount; i++) {
      cellHtml += `  <div class="grid-cell">${text || i}</div>\n`;
    }
    html = `<div class="brutal-grid-table">\n${cellHtml}</div>`;
    css = `.brutal-grid-table {
  display: grid;
  grid-template-rows: repeat(${rows}, 1fr);
  grid-template-columns: repeat(${cols}, 1fr);
  gap: ${gridGap}px;
  padding: 12px;
  background-color: #000;
  border: ${borderWidth}px solid ${borderColor};
  border-radius: ${borderRadius}px;
  box-shadow: ${shadowOffset}px ${shadowOffset}px 0px ${shadowColor};
  width: 280px;
  min-height: 200px;
}
.grid-cell {
  background-color: ${bgColor};
  color: ${textColor};
  font-family: '${fontFamily}', sans-serif;
  font-size: ${fontSize}px;
  font-weight: 800;
  border: 2px solid ${borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  text-transform: uppercase;
}`;
  } else {
    // text only / none
    html = `<div class="brutal-text">${text || ''}</div>`;
    css = `.brutal-text {
  color: ${textColor};
  font-family: '${fontFamily}', sans-serif;
  font-size: ${fontSize}px;
  font-weight: 800;
  text-shadow: ${shadowOffset}px ${shadowOffset}px 0px ${shadowColor};
}`;
  }

  return { html, css };
};
