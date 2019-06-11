function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  // var userSelect = d3.select("#selDataset")
  var metaDataPanel = d3.select("#sample-metadata")
  var url = `/metadata/${sample}`
  // Use `.html("") to clear any existing metadata 
  metaDataPanel.html("");
  d3.json(url).then(function (response) {
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

  // @TODO: Build a Bubble Chart using the sample data

  d3.json(url).then(function (response) {
    console.log(response);

    var x = response.otu_ids.slice(0, 10)
    console.log(x)
    var y = response.sample_values.slice(0, 10)
    console.log(y)
    var markerSize = response.sample_values.slice(0, 10)
    console.log(markerSize)
    var markerCol = response.otu_ids.slice(0, 10)
    console.log(markerCol)
    var text = response.otu_labels.slice(0, 10)
    console.log(text)
    var bubbleTrace = {
      x: x,
      y: y,
      type: "scatter",
      mode: "markers",
      marker: {
        color: markerCol,
        size: markerSize
      },
      text: text
    }
    var layout = {
      xAxis: "OTU ID"
    }
    var bubbleData = [bubbleTrace];
    Plotly.newPlot("bubble", bubbleData, layout)
  });

  // @TODO: Build a Pie Chart
  d3.json(url).then(function (response) {
    console.log(response);
    var labels = response.otu_ids.slice(0, 10)
    console.log(labels)
    var values = response.sample_values.slice(0, 10)
    console.log(values)
    var otuText = response.otu_labels.slice(0, 10)
    console.log(otuText)
    var pieTrace = {
      labels: labels,
      values: values,
      text: otuText,
      type: "pie"
    }
    pieData = [pieTrace]

    Plotly.newPlot("pie", pieData)
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each) i.e. array.slice(start, end).
  })
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
