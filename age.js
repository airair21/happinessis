// 1. Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1jslHXmb08Se0APqMo6lGwMTaubkpd3Q",
    authDomain: "happiness-is-api.firebaseapp.com",
    projectId: "happiness-is-api",
    storageBucket: "happiness-is-api.appspot.com",
    messagingSenderId: "619524571664",
    appId: "1:619524571664:web:741f1619443b4d281e4095",
    measurementId: "G-Z5J45S2NLT"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  // 2. Setup Full-Screen Visualization
  const width = window.innerWidth;
  const height = window.innerHeight;
  const currentYear = new Date().getFullYear();
  
  const svg = d3.select("#chart-container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("click", function(event) {
      // Only reset if clicking directly on SVG background
      if (event.target === this) {
        resetView();
      }
    });

  const svgGroup = svg.append("g");
  const zoom = d3.zoom()
    .scaleExtent([1, 10])
    .on("zoom", (event) => {
      svgGroup.attr("transform", event.transform);
    });

  svg.call(zoom);

  // Handle window resize
  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    svg.attr("width", newWidth).attr("height", newHeight);
  });

  // Reset view function
  function resetView() {
    hideDetailsPanel();
    svg.transition()
      .duration(800)
      .call(zoom.transform, d3.zoomIdentity);
  }

  // 3. Fetch Data from Firebase
  function fetchData() {
    database.ref('inputs').once('value')
      .then((snapshot) => {
        const rawData = snapshot.val();
        if (!rawData) {
          document.getElementById("loading").textContent = "No data found at specified path.";
          return;
        }
        
        // Convert object to array if needed
        const data = Array.isArray(rawData) ? rawData : Object.values(rawData);
        
        document.getElementById("loading").style.display = "none";
        processData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        document.getElementById("loading").textContent = "Error loading data. Check console.";
      });
  }

    // 4. Process Data and Create Visualization with Historical Ages
    function processData(data) {
      // Clean the data and create historical records
      const expandedData = [];
      
      data.forEach(item => {
        const age = parseInt(item.age) || 0;
        if (age <= 0) return;
        
        const recordYear = parseInt(item.currentYear) || currentYear;
        const yearsDifference = currentYear - recordYear;
        
        // Create records for current age and historical ages
        for (let i = 0; i <= 10; i += 5) { // Current, 5 years ago, 10 years ago
          const historicalAge = age - (yearsDifference + i);
          if (historicalAge > 0) { // Only include positive ages
            expandedData.push({
              ...item,
              age: historicalAge,
              historicalOffset: i,
              isCurrent: i === 0
            });
          }
        }
      });

      // Group by age range (e.g., "10s", "20s")
      const ageGroups = d3.group(expandedData, d => `${Math.floor(d.age / 10)}0s`);
      
      // Create hierarchy - each age group contains individual records
      const root = d3.hierarchy({
        children: Array.from(ageGroups, ([key, values]) => ({
          key,
          children: values
        }))
      }).sum(d => 10); // Base size for all nodes

      // Pack layout with padding
      const packLayout = d3.pack()
        .size([width, height])
        .padding(10);
      packLayout(root);

      // Clear previous visualization
      svgGroup.selectAll("*").remove();

      // Render age groups
      const groups = svgGroup.selectAll(".age-group")
        .data(root.descendants().filter(d => d.depth === 1))
        .enter().append("g")
        .attr("class", "age-group")
        .attr("transform", d => `translate(${d.x},${d.y})`);

      // Age group circles
      groups.append("circle")
        .attr("r", d => d.r)
        .attr("fill", d => d3.hcl("#ffd965"))
        .attr("fill-opacity", 0.2)
        .attr("stroke", d => d3.hcl("#ffdf7f"))
        .attr("stroke-width", 2)
        .style("cursor", "pointer")
        .on("click", (event, d) => {
          event.stopPropagation();
          zoomToGroup(d);
        })
        .on("mouseover", showGroupTooltip)
        .on("mouseout", hideTooltip);

      // Age group label
      groups.append("text")
        .text(d => d.data.key)
        .attr("class", "age-label")
        .attr("dy", d => d.r + 20);

      // Render all individual records immediately (not just on zoom)
      const individuals = svgGroup.selectAll(".individual")
        .data(root.descendants().filter(d => d.depth > 1))
        .enter().append("g")
        .attr("class", "individual")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .on("click", function(event, d) {
          event.stopPropagation();
          showDetailsPanel(d.data);
        })
        .on("mouseover", function(event, d) {
          d3.select(this).select("text").style("opacity", 1);
          showIndividualTooltip(event, d);
        })
        .on("mouseout", function() {
          d3.select(this).select("text").style("opacity", 0);
          hideTooltip();
        });

      // Individual circles
      individuals.append("circle")
        .attr("r", d => d.data.isCurrent ? 10 : 7)
        .attr("fill", d => d3.hcl("#ffcc32"))
        .attr("stroke", "#ffcc32")
        .attr("stroke-width", d => d.data.isCurrent ? 2 : 1.5);

      // Age labels for individuals
      individuals.append("text")
        .text(d => d.data.age)
        .attr("class", "age-label")
        .attr("dy", d => (d.data.isCurrent ? 10 : 7) + 15)
        .style("font-size", d => d.data.isCurrent ? "14px" : "12px")
        .style("opacity", 0)
        .style("pointer-events", "none")
        .style("font-weight", "bold");
    }

    // 5. Zoom Function to focus on age groups
    function zoomToGroup(groupNode) {
      const duration = 800;
      const targetScale = Math.min(3, width / (groupNode.r * 2));
      const targetX = -groupNode.x * targetScale + width / 2;
      const targetY = -groupNode.y * targetScale + height / 2;
    
      svg.transition()
        .duration(duration)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(targetX, targetY).scale(targetScale)
        );
    }

    // 6. Tooltip Functions
    function showGroupTooltip(event, d) {
      const tooltip = d3.select("#tooltip");
      tooltip.transition().duration(200).style("opacity", 0.95);
      tooltip.html(`
        <div style="margin-bottom: 8px; font-size: 16px; font-weight: bold; color: ${d3.interpolateHslLong("red", "blue")(0.23)}">
          ${d.data.key} Age Group
        </div>
        <div style="margin-bottom: 6px;">
          <strong>People in this group:</strong> ${d.data.children.length}
        </div>
        <div style="font-size: 12px; color: #666;">
          Larger bubbles represent current ages (at time of data entry)
        </div>
      `)
        .style("left", `${event.pageX + 15}px`)
        .style("top", `${event.pageY + 15}px`);
    }

    function showIndividualTooltip(event, d) {
      const tooltip = d3.select("#tooltip");
      tooltip.transition().duration(200).style("opacity", 0.95);
      
      const timeLabel = d.data.historicalOffset === 0 ? 
                   `${d.data.currentYear || currentYear}` : 
                   `${(d.data.currentYear || currentYear) - d.data.historicalOffset}`;
      
      let toyouField = '';
      if (d.data.historicalOffset === 0) {
        toyouField = d.data.toyou ? `<div><strong>What is happiness to you at this age? <br> </strong> ${d.data.toyou}</div>` : '';
      } else if (d.data.historicalOffset === 5) {
        toyouField = d.data.toyou5 ? `<div><strong>What is happiness to you at this age? <br> </strong> ${d.data.toyou5}</div>` : '';
      } else if (d.data.historicalOffset === 10) {
        toyouField = d.data.toyou10 ? `<div><strong>What is happiness to you at this age? <br> </strong> ${d.data.toyou10}</div>` : '';
      } else if (d.data.historicalOffset === 2) {
          toyouField = d.data.toyou2 ? `<div><strong>What is happiness to you at this age? <br> </strong> ${d.data.toyou2}</div>` : '';
        }
      
      tooltip.html(`
        <div style="margin-bottom: 8px; font-size: 16px; font-weight: bold; color: ${d3.hcl("#ffcc32")}">
          Age ${d.data.age} (${timeLabel})
        </div>
        ${toyouField}
      `)
        .style("left", `${event.pageX + 15}px`)
        .style("top", `${event.pageY + 15}px`);
    }

    function hideTooltip() {
      d3.select("#tooltip").transition().duration(200).style("opacity", 0);
    }

// Details Panel Functions
function showDetailsPanel(data) {
    const panel = d3.select("#details-panel");
    const content = d3.select("#details-content");
    
    // Get the actual age of the clicked bubble
    const bubbleAge = data.age;
    const responseYear = data.historicalOffset === 0 
        ? data.currentYear || currentYear 
        : (data.currentYear || currentYear) - data.historicalOffset;
    
    let htmlContent = `<h3>Age ${bubbleAge} (${responseYear})</h3>`;
    
    // Current year info
    const currentTimeLabel = data.currentYear || currentYear;
    
    // Add standard fields with current year context
    htmlContent += `<p><br><strong>Current Feeling (${currentTimeLabel}):<br></strong> ${data.feeling || 'N/A'}</p>`;
    htmlContent += `<p><br><strong>How does happiness influence your sense of purpose? (${currentTimeLabel})<br></strong> ${data.purpose || 'N/A'}</p>`;
    htmlContent += `<p><br><strong>How does happiness manifest in your life? (${currentTimeLabel})<br></strong> ${data.manifest || 'N/A'}</p>`;
    
    // Add all historical happiness responses with their respective years and ages
    if (data.toyou) {
      const ageAtResponse = data.age; // Current age
      htmlContent += `<p><br><strong>Happiness definition at age ${ageAtResponse} (${currentTimeLabel}):<br></strong> ${data.toyou}</p>`;
    }
    
    if (data.toyou2) {
      const year2 = currentTimeLabel - 2;
      const ageAtYear2 = data.age - 2;
      htmlContent += `<p><br><strong>Happiness definition at age ${ageAtYear2} (${year2}):<br></strong> ${data.toyou2}</p>`;
    }
    
    if (data.toyou5) {
      const year5 = currentTimeLabel - 5;
      const ageAtYear5 = data.age - 5;
      htmlContent += `<p><br><strong>Happiness definition at age ${ageAtYear5} (${year5}):<br></strong> ${data.toyou5}</p>`;
    }
    
    if (data.toyou10) {
      const year10 = currentTimeLabel - 10;
      const ageAtYear10 = data.age - 10;
      htmlContent += `<p><br><strong>Happiness definition at age ${ageAtYear10} (${year10}):<br></strong> ${data.toyou10}</p>`;
    }
  
    content.html(htmlContent);
    panel.classed("visible", true);
}


    function hideDetailsPanel() {
      d3.select("#details-panel").classed("visible", false);
    }

    // Event Listeners
    d3.select(".close-panel").on("click", hideDetailsPanel);
    
    // Click on background to reset view
    d3.select(".background-click").on("click", function() {
      hideDetailsPanel();
      svg.transition()
        .duration(800)
        .call(zoom.transform, d3.zoomIdentity);
    });
    
    // Reset button
    d3.select("#reset").on("click", function() {
      hideDetailsPanel();
      svg.transition()
        .duration(800)
        .call(zoom.transform, d3.zoomIdentity);
    });


    // Create instructions elements
const instructions = d3.select("body").append("div")
.attr("id", "instructions")
.style("position", "fixed")
.style("top", "10px")
.style("left", "50%")
.style("transform", "translateX(-50%)")
.style("background", "rgba(255, 255, 255, 0.95)")
.style("padding", "15px 25px")
.style("border-radius", "8px")
.style("box-shadow", "0 2px 10px rgba(0,0,0,0.2)")
.style("max-width", "600px")
.style("z-index", "1000")
.style("display", "none")
.html(`
  <h3 style="margin-top: 0; color: #333;">How to Use This Visualization</h3>
  <ul style="padding-left: 20px;">
    <li><strong>Click on age groups</strong> (large circles) to zoom in</li>
    <li><strong>Click on individual bubbles</strong> to see detailed responses</li>
    <li><strong>Click on the background</strong> or the Reset button to zoom out</li>
    <li><strong>Hover over bubbles</strong> to see quick previews</li>
    <li>Larger bubbles represent current responses, smaller ones are historical</li>
  </ul>
  <!-- <button id="close-instructions" style="margin-top: 10px; padding: 5px 15px; background: #ffcc32; border: none; border-radius: 4px; cursor: pointer;">Got It!</button> -->
`);

const toggleButton = d3.select("body").append("button")
.attr("id", "instructions-toggle")
.style("position", "fixed")
.style("top", "10px")
.style("left", "10px")
.style("z-index", "1000")
.style("padding", "8px 15px")
.style("background", "#ffcc32")
.style("border", "none")
.style("border-radius", "4px")
.style("cursor", "pointer")
.style("font-weight", "bold")
.text("Show Instructions");

// Fix: Proper event binding for dynamically created elements
function setupInstructionEvents() {
// Toggle functionality
toggleButton.on("click", function() {
  const isVisible = instructions.style("display") === "block";
  instructions.style("display", isVisible ? "none" : "block");
  d3.select(this).text(isVisible ? "Show Instructions" : "Hide Instructions");
});

// Close button functionality - using event delegation
d3.select("body").on("click", "#close-instructions", function() {
  instructions.style("display", "none");
  toggleButton.text("Show Instructions");
});
}

// Initialize events
setupInstructionEvents();

// Show instructions briefly when first loading
setTimeout(() => {
instructions.style("display", "block");
toggleButton.text("Hide Instructions");
}, 500);

// Auto-hide after 10 seconds
setTimeout(() => {
if (instructions.style("display") === "block") {
  instructions.style("display", "none");
  toggleButton.text("Show Instructions");
}
}, 10000);

    // Initialize
    fetchData();