import { Component } from '@angular/core';

import * as Highcharts from 'highcharts';
import { Options } from "highcharts";

import moment from 'moment';


interface CustomSeries extends Highcharts.Series {
  pulse?: Highcharts.SVGElement;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mariyano-chart-task';

  Highcharts: typeof Highcharts = Highcharts;

  chart: Highcharts.Chart | undefined;

  currentValue: number = 500;
  
  Value:number = 0;
  
  constructor(){
    
  }

  add(){
    this.currentValue++
  }

  dec(){
    this.currentValue--
  }

chartOptions: Highcharts.Options = {
  chart: {
    type: 'spline',
    backgroundColor: '#abdbe3',
    events: {
      // load: this.onChartLoad()
  }
  },
  time: {
    useUTC: false
  },
  title: {
    text: 'GRAPH'
  },
  accessibility: {
    announceNewData: {
      enabled: true,
      minAnnounceInterval: 15000,
      announcementFormatter: function (allSeries, newSeries, newPoint) {
        if (newPoint) {
          return 'New point added. Value: ' + newPoint.y;
        }
        return false;
      }
    }
  },
  xAxis: {
    type: 'datetime',
    labels: {
      formatter: function() {
        const date = new Date(this.value);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      }
    },
    title: {
      text: 'Time'
    }
  },
  yAxis: {
    title: {
      text: 'Value' 
    },
    opposite: true,
    plotLines: [{
      value: 0,
      width: 1,
      color: '#808080'
    }]
  },
  tooltip: {
    // headerFormat: '<b>Stock</b><br/>',
    // pointFormat: 'Time: {point.x}<br/>Value: {point.y:.2f}'
    formatter: function () {
      const date = moment(this.x);
      return `<b>${this.series.name}</b><br/>` +
        `${date.format('HH:mm:ss')} time, ${this.y} $.`;
    }
  },
  legend: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  series: [{
    type: 'spline',
    name: 'Stock Value',
    lineWidth: 2,
    color: '', 
    data: [] 
  }]
};

ngAfterViewInit() {
  this.chart = Highcharts.chart('container', this.chartOptions);
}

getRandomIncrement() {
  return Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
}

getRandomDecrement() {
  return Math.floor(Math.random() * (-400 - 100 + 1)) + 100;
}


createInitialData(event: number) {
  if (!this.chart) {
    return;
  }

  const series = this.chart.series[0];

  const currentTime = new Date().getTime();  

  let increase = this.getRandomIncrement()

  let decrease = this.getRandomDecrement()


  if(event === 1){
  series.color = "#008000";
  const point = {
    x: currentTime,
    y: increase 
  };
  this.Value = increase
  series.addPoint(point, true, false);
  }
  if(event === 2){
    const point = {
      x: currentTime,
      y: decrease 
    };
    this.Value = decrease
    series.color = "#FF0000";
    series.addPoint(point, true, false);
  }


}


  


}