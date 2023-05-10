import {Component, HostListener, Input} from '@angular/core';
import {Mark} from "../../../../models/Mark";
import {MarkService} from "../../../../service/mark.service";
import Chart from "chart.js/auto";
import {User} from "../../../../models/User";

@Component({
  selector: 'app-stat-per-topic',
  templateUrl: './stat-per-topic.component.html',
  styleUrls: ['./stat-per-topic.component.css']
})
export class StatPerTopicComponent {
  @Input() user!: User;
  public chart:any;
  marks!: Mark[];
  correctAns!: number[];
  incorrectAns!: number[];
  dateLabel!: string[];
  constructor(private markService: MarkService) {
    this.correctAns = [];
    this.incorrectAns = [];
    this.dateLabel = [];
  }

  ngOnInit(): void {
    this.markService.getMarksByTopics(this.user.username).subscribe(data =>{
      this.marks = data;
      this.marks.forEach(value => {
        this.correctAns.push(value.correctAnswers);
        this.incorrectAns.push(value.totalQuestions - value.correctAnswers);
        this.dateLabel.push(value.topic !== null ? value.topic : 'PSW');
      })
      this.createChart();
      console.log(data);
    },error => {
      console.log(error);
    })
  }
  createChart(){

    this.chart = new Chart("myChart1", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.dateLabel,
        datasets: [
          {
            label: "correct answers",
            data: this.correctAns,
            backgroundColor: 'limegreen'
          },
          {
            label: "incorrect answers",
            data:this.incorrectAns,
            backgroundColor: 'red'
          }
        ]
      },
      options: {
        aspectRatio:3
      }

    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }
}
