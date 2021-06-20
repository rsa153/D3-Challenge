// create path to data
var path = "assets/data/data.csv";

// set height and width of svg
var svgWidth = 960;
var svgHeight = 500;

// set margins
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create svg wrapper

var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var xAxis = "age";

function scale(data, xAxis) {
    
    var xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[xAxis]) * 0.8,
        d3.max(data, d => d[xAxis]) * 1.2
      ])
      .range([0, width]);
  
    return xScale;
  
  }

  function renderAxes(newXScale, xAxis1) {
    var axisBottom = d3.axisBottom(newXScale);
  
    xAxis1.transition()
      .duration(1000)
      .call(axisBottom);
  
    return xAxis1;
  }