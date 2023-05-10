import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Mark } from '../../../../models/Mark';
import { MarkService } from '../../../../service/mark.service';
import Chart from 'chart.js/auto';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-stat-per-day',
  templateUrl: './stat-per-day.component.html',
  styleUrls: ['./stat-per-day.component.css'],
})
export class StatPerDayComponent implements OnInit {
  @Input() pupil!: User;
  public chart: any;
  marks!: Mark[];
  correctAns!: number[];
  incorrectAns!: number[];
  dateLabel!: Date[];

  constructor(private markService: MarkService) {
    this.correctAns = [];
    this.incorrectAns = [];
    this.dateLabel = [];
  }

  ngOnInit(): void {
    this.markService.getMarksByDays(this.pupil.username).subscribe(
      (data) => {
        this.marks = data;
        this.marks.forEach((value) => {
          this.correctAns.push(value.correctAnswers);
          this.incorrectAns.push(value.totalQuestions - value.correctAnswers);
          this.dateLabel.push(value.date);
        });
        this.createChart();
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createChart() {
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.dateLabel,
        datasets: [
          {
            label: 'correct answers',
            data: this.correctAns,
            backgroundColor: 'limegreen',
          },
          {
            label: 'incorrect answers',
            data: this.incorrectAns,
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        aspectRatio: 3,
      },
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
