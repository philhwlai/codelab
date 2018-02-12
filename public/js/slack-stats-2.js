var parseDate = d3.timeParse("%Y%m%d");

d3.csv("csv/slack-stats-2.csv")
    .row(function(d){ return {day: parseDate(d.day),
          slacks:Number(d.slacks)};  })
    .get(function(error,data){
      var height = 500;
      var width = 500;
      var maxSlack = d3.max(data,function(d){ return d.slacks; });
      var minDay = d3.min(data,function(d){return d.day;});
      var maxDay = d3.max(data,function(d){return d.day;});


      var y = d3.scaleLinear()
                .domain([0,maxSlack])
                .range([height,0]);
      var x = d3.scaleTime()
                .domain([minDay,maxDay])
                .range([0,width]);
      var yAxis = d3.axisLeft(y);
      var xAxis = d3.axisBottom(x);

      var svg2 = d3.select("body").append("svg2")
                  .attr("height","100%")
                  .attr("width","100%");

      var margin = {left:50,right:50,top:40,bottom:0};

      var chartGroup = svg2.append("g")
              .attr("transform","translate("+margin.left+","+margin.top+")");

      var line = d3.line()
              .x(function(d){return x(d.day);})
              .y(function(d){return y(d.slacks);});

      chartGroup.append("path").attr("d",line(data));


            console.log(minDay);
            console.log("End date = " + maxDay);
        })
