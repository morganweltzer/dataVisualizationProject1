
class HistogramPlot {

    /**
     * Class constructor with basic configuration
     * @param {Object}
     * @param {Array}
     */

    constructor(_config, _data) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 300, // Adjusted for better visibility
        containerHeight: _config.containerHeight || 300, // Adjusted for better visibility
        margin: _config.margin || {top: 30, right: 30, bottom: 30, left: 40}, // Adjusted left for axis label
        tooltipPadding: 10
      }
      this.data = _data;
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
        .domain(d3.extent(vis.data, d => d.poverty_perc))
        .range([0, vis.width]);
  
      vis.yScale = d3.scaleLinear()
        .range([vis.height, 0]);
  
      // Bin the data
      let histogram = d3.histogram()
          .value(d => d.poverty_perc)
          .domain(vis.xScale.domain())
          .thresholds(vis.xScale.ticks(40)); // Adjust the number of bins
  
      let bins = histogram(vis.data);
  
      // Update the yScale domain based on the bins
      vis.yScale.domain([0, d3.max(bins, d => d.length)]);
  
      // Axes
      vis.xAxis = d3.axisBottom(vis.xScale);
      vis.yAxis = d3.axisLeft(vis.yScale);
  
      vis.svg.append('g')
          .attr('transform', `translate(0,${vis.height})`)
          .call(vis.xAxis);
      
      vis.svg.append('g')
          .call(vis.yAxis);
    
    //   vis.svg.append("text")
    //       .attr("class", "vertical-axis-label") // Apply the CSS class
    //       .attr("y", 0 - vis.config.margin.left)
    //       .attr("x", 0 - (vis.height / 2))
    //       .attr("dy", "1em") // Adjust the position as needed
    //       .text("Y-axis Label"); // Replace with your actual label
  
      // Draw bars
      vis.svg.selectAll("rect")
        .data(bins)
        .enter().append("rect")
          .attr("x", 1)
          .attr("transform", d => `translate(${vis.xScale(d.x0)},${vis.yScale(d.length)})`)
          .attr("width", d => Math.max(0, vis.xScale(d.x1) - vis.xScale(d.x0) - 1))
          .attr("height", d => vis.height - vis.yScale(d.length))
          .style("fill", "#4292c6");
    }
  }
  
  class HistogramPlot2 {

    /**
     * Class constructor with basic configuration
     * @param {Object}
     * @param {Array}
     */

    constructor(_config, _data) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 300, // Adjusted for better visibility
        containerHeight: _config.containerHeight || 300, // Adjusted for better visibility
        margin: _config.margin || {top: 30, right: 30, bottom: 30, left: 40}, // Adjusted left for axis label
        tooltipPadding: 10
      }
      this.data = _data;
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
        .domain(d3.extent(vis.data, d => d.air_quality))
        .range([0, vis.width]);
  
      vis.yScale = d3.scaleLinear()
        .range([vis.height, 0]);
  
      // Bin the data
      let histogram = d3.histogram()
          .value(d => d.air_quality)
          .domain(vis.xScale.domain())
          .thresholds(vis.xScale.ticks(40)); // Adjust the number of bins
  
      let bins = histogram(vis.data);
  
      // Update the yScale domain based on the bins
      vis.yScale.domain([0, d3.max(bins, d => d.length)]);
  
      // Axes
      vis.xAxis = d3.axisBottom(vis.xScale);
      vis.yAxis = d3.axisLeft(vis.yScale);
  
      vis.svg.append('g')
          .attr('transform', `translate(0,${vis.height})`)
          .call(vis.xAxis);
      
      vis.svg.append('g')
          .call(vis.yAxis);
  
      // Draw bars
      vis.svg.selectAll("rect")
        .data(bins)
        .enter().append("rect")
          .attr("x", 1)
          .attr("transform", d => `translate(${vis.xScale(d.x0)},${vis.yScale(d.length)})`)
          .attr("width", d => Math.max(0, vis.xScale(d.x1) - vis.xScale(d.x0) - 1))
          .attr("height", d => vis.height - vis.yScale(d.length))
          .style("fill", "#4292c6");
    }
  }
  