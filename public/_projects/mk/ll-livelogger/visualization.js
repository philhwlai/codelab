// var barWidth = 20;
// var barOffset = 5;
// var offset = 5;
// var yOffset = 270;
//
// d3.select('#viz')
//   .append('svg')
//     .attr('width', 960)
//     .attr('height', 540)
//     .style('background-color', 'rgb(70,70,70)')
//   .selectAll('rect')
//   .data(mydata)
//   .enter().append('rect')
//     .attr('x', function(d, i){
//       return (i*(barWidth + barOffset)) + offset
//       console.log(i);
//     })
//     .attr('y', (d, i)=>{return yOffset-(d.high)})
//     .attr('height', (d, i)=>{return (d.high-d.low)})
//     .attr('width', barWidth)
//     .style('stroke', 'white')
//     .style('stroke-width', '.5px')
//     .style('fill', 'rgba(220,180,20,0.0)')
//     .on('mouseover', function(d){
//       d3.select(this)
//       .transition()
//       .duration(500)
//       .style('fill', 'rgba(220,180,20,0.8)')
//     })
//     .on('mouseout', function(d){
//       d3.select(this)
//       .transition()
//       .duration(3500)
//       .style('fill', 'rgba(220,180,20,0.0)')
//     })
// ;
//
// // THIS JUST ADDS i TO THE BOTTOM OF EACH BAR
//
// var enterSelection = d3.select('#viz svg')
// .selectAll('text')
// .data(mydata)
// .enter();
//
// enterSelection.append('text')
//   .attr('x', function(d, i){
//     return (i*(barWidth + barOffset)) + offset + 10})
//   .attr('y', function(d, i){
//     return yOffset-(d.low) + 10
//   })
//   .text((d, i)=>{return d.low})
//   .attr('font-size', 8)
//   .attr('text-anchor', 'middle')
//   .attr('fill', 'white')
//   .attr('font-family', 'Lato')
//
// enterSelection.insert('text')
//   .attr('x', function(d, i){
//     return (i*(barWidth + barOffset)) + offset + 10})
//   .attr('y', function(d, i){
//     return yOffset-(d.high) - 4
//   })
//   .text((d, i)=>{return d.high})
//   .attr('font-size', 8)
//   .attr('text-anchor', 'middle')
//   .attr('fill', 'white')
//   .attr('font-family', 'Lato')
