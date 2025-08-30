
document.getElementById("menuBtn").onclick = () => {
  document.getElementById("sidebar").classList.toggle("open");
};


document.getElementById("exportBtn").onclick = () => {
  const content = document.documentElement.outerHTML;
  const blob = new Blob([content], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "dash.html";
  link.click();
};


new Chart(document.getElementById("pipelineChart"), {
  type: "line",
  data: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [{
      label: "Opportunities",
      data: [10, 15, 8, 20, 18, 25],
      borderColor: "#0a53c1",
      backgroundColor: "rgba(10,83,193,0.2)",
      fill: true,
      tension: 0.3
    }]
  }
});
