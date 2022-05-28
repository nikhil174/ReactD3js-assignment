import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./chartPage.scss";

const ChartPage = () => {
  const canvas = useRef();

  const xdata = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const initialData = [5, 16, 22, 27, 39, 41, 33, 24, 18, 13, 10, 7];
  const [ydata, setYdata] = useState(initialData);
  const [change, setChange] = useState(false);

  const handleClick = () => {
    for (let i = 0; i < 12; i++) {
      initialData[i] = Math.floor(Math.random() * 50);
      if (initialData[i] < 10) initialData[i] += 15;
    }
    setYdata(initialData);
    setChange(true);
  };

  const xdim = 750;
  const ydim = 500;
  const marginTop = 80;
  const marginBottom = 80;
  const marginLeft = 120;
  const marginRight = 120;

  useEffect(() => {
    const svg = d3.select(canvas.current);
    setChange(false);
    addAxes(svg);
    addBars(svg);
    addText(svg);
  }, [change]);

  const xscale = d3
    .scaleBand()
    .domain(xdata)
    .range([marginLeft, xdim + marginLeft])
    .padding(0.1);

  const yscale = d3
    .scaleLinear()
    .domain([0, d3.max(ydata)])
    .range([ydim, 0]);

  const addAxes = (svg) => {
    const xAxis = d3.axisBottom(xscale);

    d3.select("#xaxis").remove();
    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${ydim + marginTop})`)
      .attr("id", "xaxis");

    d3.select("#yaxis").remove();
    const yAxis = d3.axisLeft(yscale);
    svg
      .append("g")
      .call(yAxis)
      .attr("transform", `translate(${marginLeft}, ${marginTop})`)
      .attr("id", "yaxis");
  };

  const addBars = (svg) => {
    const linearScale = d3
      .scaleLinear()
      .domain([0, d3.max(ydata)])
      .range([0, ydim]);

    const scaledYData = ydata.map((yval) => linearScale(yval));

    d3.selectAll("#bars").remove();
    svg
      .selectAll("rect")
      .data(scaledYData)
      .enter()
      .append("rect")
      .attr("width", xscale.bandwidth())
      .attr("id", "bars")
      .attr("height", (d) => {
        return d;
      })
      .attr("x", (d, i) => {
        return xscale(xdata[i]);
      })
      .attr("y", (d) => {
        return marginTop + ydim - d;
      })
      .attr("fill", "#2eaefe")
      .attr("stroke", "black");
  };

  const addText = (svg) => {
    d3.selectAll("#xtext").remove();
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .text("Average Monthly Temperature")
      .attr("id", "xtext")
      .attr("x", (marginLeft + marginRight + xdim) / 2)
      .attr("y", marginTop / 2);

    d3.select("#ytext").remove();
    svg
      .append("text")
      .text("Temperature in Celcius")
      .attr("x", -(marginTop + marginBottom + ydim) / 2)
      .attr("id", "ytext")
      .attr("y", marginLeft / 2)
      .attr("transform", `rotate(-90, ${marginLeft / 2} ${marginTop / 2})`);
  };

  return (
    <div className="chartpage">
      <div className="canvas" style={{ transition: "all 3s ease" }}>
        <svg
          viewBox={`0 0 ${xdim + marginLeft + marginRight} ${
            ydim + marginTop + marginBottom
          }`}
          preserveAspectRatio="xMinYMin"
          width="100%"
          height="100%"
          style={{ backgroundColor: "beige" }}
          ref={canvas}
        ></svg>
      </div>
      <button type="button" onClick={handleClick}>
        Change data
      </button>
    </div>
  );
};

export default ChartPage;
