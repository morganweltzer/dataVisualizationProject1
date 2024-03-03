class ScatterPlot {

    /**
     * Class constructor with basic configuration
     * @param {Object}
     * @param {Array}
     */

    constructor(_config, _data) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 300,
        containerHeight: _config.containerHeight || 300,
        margin: _config.margin || {top: 30, right: 30, bottom: 30, left: 30},
        tooltipPadding: 10
      }
      this.data = _data;
      console.log(this.data);
      this.initVis();
    }
    
    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
      
        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement).append('svg')
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)
          .append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);


      // Scales

  

      vis.xScale = d3.scaleLinear()
      .domain(d3.extent(vis.data, d => d.poverty_perc >= 0 ? d.poverty_perc : 0))
      .range([0, vis.width]);

     vis.yScale = d3.scaleLinear()
      .domain(d3.extent(vis.data, d => d.air_quality >= 0 ? d.air_quality : 0))
      .range([vis.height, 0]);
  
      // Axes
      vis.xAxis = d3.axisBottom(vis.xScale);
      vis.yAxis = d3.axisLeft(vis.yScale);
  
      vis.svg.append('g')
          .attr('transform', `translate(0,${vis.height})`)
          .call(vis.xAxis);
  
      vis.svg.append('g')
          .call(vis.yAxis);

    

      // Plotting data points
      vis.svg.selectAll('.dot')
        .data(vis.data)
    .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', d => vis.xScale(d.poverty_perc))
        .attr('cy', d => vis.yScale(d.air_quality))
        .attr('r', 1)
        .style('fill', '#4292c6');

      // Optionally, add tooltips or other interactive elements here
    }
  }
  