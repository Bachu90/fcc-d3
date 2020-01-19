async function init() {
  let response = {};
  await fetch('data.json')
    .then(res => res.json())
    .then(json => response = json)

  const container = document.getElementById('chart');

  console.log(response)

  let svgWidth = 1024,
    svgHeight = 400,
    xPadding = 40,
    yPadding = 20
  barWidth = (svgWidth - xPadding - 5) / response.data.length;

  const xScale = d3.scaleTime();
  xScale.domain([
    d3.min(response.data, d => new Date(d[0])),
    d3.max(response.data, d => new Date(d[0]))
  ]);
  xScale.range([xPadding, svgWidth - 5])

  const yScale = d3.scaleLinear();
  yScale.domain([
    d3.min(response.data, d => d[1]),
    d3.max(response.data, d => d[1]),
  ])
  yScale.range([yPadding, svgHeight - (2 * yPadding)]);

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)

  /* BARS */
  svg.selectAll('rect')
    .data(response.data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => xPadding + (i * barWidth))
    .attr('y', (d, i) => (svgHeight - yPadding) - yScale(d[1]))
    .attr('width', barWidth)
    .attr('height', (d, i) => yScale(d[1]))
    .attr('fill', 'orangered')
    .attr('class', 'bar')
    .attr('data-date', d => `${d[0]}`)
    .attr('data-gdp', d => `${d[1]}`)
    .attr('data-tooltip', (d, i) => `tooltip-${i}`)
    .append('title')
    .text(d => `$${d[1]} Billion`)

  /* AXES */

  const xAxis = d3.axisBottom(xScale);

  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${svgHeight - yPadding})`)
    .call(xAxis)

  const yAxisScale = d3.scaleLinear();
  yAxisScale.domain([
    d3.min(response.data, d => d[1]),
    d3.max(response.data, d => d[1]),
  ])
  yAxisScale.range([
    svgHeight - 2 * yPadding,
    0
  ])

  const yAxis = d3.axisLeft(yAxisScale);

  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${xPadding}, ${yPadding})`)
    .call(yAxis)
}

window.addEventListener('load', init);