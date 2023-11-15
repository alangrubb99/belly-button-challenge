function init() {

  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    console.log(data);
    let names = data.names;
    // let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");


    for (let i = 0; i < names.length; i++) {
      selector
        .append("option")
        .text(names[i])
        .property("value", names[i]);
    };

    // Get first name to initialize the dropdown
    let result = names[0];
    buildPanel(result);
    buildCharts(result);

  });
}

function buildPanel(sample) {

  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    console.log(data);
    let metadata = data.metadata;
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    for (key in result) {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    };

  });
}

function buildCharts(sample) {

  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    console.log(data);
    let samples = data.samples;
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    let otuIds = result.otu_ids;
    let otuLabels = result.otu_labels;
    let sampleValues = result.sample_values;


    // Make a bar chart

    let yticks = otuIds.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let barData = [
      {
        y: yticks,
        x: sampleValues.slice(0, 10).reverse(),
        text: otuLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    let Layout = {
      title: "Belly Button OTUs",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, Layout);

    // Build a Bubble Chart
    let bubbleLayout = {
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 50 }
    };

    let bubbleData = [
      {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otuIds
        }
      }
    ];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  });
}

// Fetch new data each time a new sample is selected

function optionChanged(dog) {
  buildPanel(dog);
  buildCharts(dog);

}

// Initialize the web page
init();
