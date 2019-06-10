function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  // var userSelect = d3.select("#selDataset")
  var metaDataPanel = d3.select("#sample-metadata")
  var url = `/metadata/${sample}`
  // Use `.html("") to clear any existing metadata 
  metaDataPanel.html("");
  d3.json(url).then(function(response) {
    console.log(response);
    var data = [response];
    data.forEach(datum => {  
      // Use `Object.entries` to add each key and value pair to the panel
      // Use d3 to append new
      // tags for each key-value in the metadata.
      Object
        .entries(datum)
        .forEach(([datumKey, datumValue]) => {
        metaDataPanel.append("p").text(`${datumKey}: ${datumValue}`)
        });
    });

    });
  }
  
    

    
    

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
// }

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var bubblePanel = d3.select("#bubble")
  var piePanel = d3.select("#pie")
  var url = `/samples/${sample}`
  d3.json(url).then(function(response) {
    console.log(response);
    // The values below are now logging, but I'm getting a bunch of messy errors
    // I can't quite fathom...
    var x = response.otu_ids
    console.log(x)
    var y = response.sample_values
    console.log(y)
    var markerSize = response.sample_values
    console.log(markerSize)
    var markerCol = response.otu_ids
    console.log(markerCol)
    var text = response.otu_labels
    console.log(text)
    var trace = {
      x: x,
      y: y,
      type: "scatter",
      marker: {
        color: markerCol,
        size: markerSize
      },
      text: text
    }
    var data = trace;
    Plotly.plot(bubblePanel, data)
  });
 
  
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart

    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each) i.e. array.slice(start, end).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
