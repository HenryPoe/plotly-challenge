/**
 * Plotly Challenge
 * Henry Poe
 * Last edited 06/16/2021
 */

function createBar(data, index) {
    var barTrace = [{
        x: data.samples[index].sample_values.slice(0, 10),
        y: data.samples[index].otu_ids.slice(0, 10).map((id) => "OTU " + id),
        text: data.samples[index].otu_labels.slice(0, 10),
        orientation: 'h',
        type: "bar"
    }];
    var layout = {
        title: "Top 10 Bacteria Cultures Found",
        yaxis: {
            autorange: "reversed",
          }
    };
    Plotly.newPlot("bar", barTrace, layout)
};

function createBubble(data, index) {
    var bubbleTrace = [{
        x: data.samples[index].otu_ids,
        y: data.samples[index].sample_values,
        mode: "markers",
        marker: {
            size: data.samples[index].sample_values,
            color: data.samples[index].otu_ids
        },
        text: data.samples[index].otu_labels
    }];
    var layout = {
        title: "Bacteria Cultures per Sample",
    };
    Plotly.newPlot("bubble", bubbleTrace, layout)
}

function writeDemo(data, index) {
    d3.select("ul").remove()
    list = d3.select("#sample-metadata").append("ul").classed("list-unstyled", true);
    demographicsData = Object.entries(data.metadata[index]);

    for (var i = 0; i < demographicsData.length; i++) {
        list.append('li').classed("pb-3 fs-4", true)
            .text(demographicsData[i][0].toUpperCase() + ": " + demographicsData[i][1])
    }
        
}

function createGauge(data, index) {
    var gaugeTrace = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: data.metadata[index].wfreq,
            title: { text: "Weekly Belly Button Washes" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                bar: { color: "black" },
                axis: { range: [null, 9], dtick: 1},
                steps: [
                    { range: [0, 1], color: "#FCE4EC" },
                    { range: [1, 2], color: "#F8BBD0" },
                    { range: [2, 3], color: "#F48FB1" },
                    { range: [3, 4], color: "#F06292" },
                    { range: [4, 5], color: "#EC407A" },
                    { range: [5, 6], color: "#E91E63" },
                    { range: [6, 7], color: "#D81B60" },
                    { range: [7, 8], color: "#C2185B" },
                    { range: [8, 9], color: "#AD1457" }
                ]
            }
        }
    ];
    
    var layout = { 
        width: 600, 
        height: 500, 
        margin: { t: 0, b: 0 },
    };
    Plotly.newPlot('gauge', gaugeTrace, layout);
}

function update() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    var index = d3.select("#selDataset").property("value");
    createBar(data, index);
    createBubble(data, index);
    writeDemo(data, index);
    createGauge(data, index);
}

// Calls the update when dropdown is changed
d3.selectAll("#selDataset").on("change", update);
// Variable to store samples.json data
var data;

// Import samples data from json
d3.json("samples.json").then((json) => {
    console.log(json);
    data = json;

    // Fill the dropdown menu on the page
    var dropdown = d3.select("#selDataset");
    for(var i = 0; i < data.names.length; i++) {
        dropdown.append("option").text(data.names[i]).attr("value", i)
    }

    createBar(data, 0);
    createBubble(data, 0);
    writeDemo(data, 0);
    createGauge(data, 0);
})