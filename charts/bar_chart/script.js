async function init() {
  let response = {};
  await fetch('data.json')
    .then(res => res.json())
    .then(json => response = json)

  const container = document.getElementById('chart');

  let yMargin = 40,
    svgWidth = 1024,
    svgHeight = 400,
    barWidth = svgWidth / 275;

  d3
    .select(container)
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .selectAll('rect')
    .data(response.data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * barWidth)
    .attr('y', (d, i) => svgHeight - d[1])
    .attr('width', barWidth)
    .attr('height', (d, i) => d[1])
    .attr('fill', 'orangered')
    .attr('class', 'bar')



}

window.addEventListener('load', init);