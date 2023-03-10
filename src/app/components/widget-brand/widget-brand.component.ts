import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { cibFacebook, cibLinkedin, cibTwitter, cilCalendar } from '@coreui/icons';
@Component({
  selector: 'app-widget-brand',
  templateUrl: './widget-brand.component.html',
  styleUrls: ['./widget-brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetBrandComponent implements AfterContentInit {

  constructor(private changeDetectorRef: ChangeDetectorRef) { }
  icons = { cibFacebook, cibLinkedin, cibTwitter, cilCalendar };

  @Input() withCharts?: boolean;
  chartOptions = {
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };
  labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  datasets = {
    borderWidth: 2,
    fill: true
  };
  colors = {
    backgroundColor: 'rgba(255,255,255,.1)',
    borderColor: 'rgba(255,255,255,.55)',
    pointHoverBackgroundColor: '#fff'
  };
  brandData = [
    {
      icon: this.icons.cibFacebook,
      values: [{ title: 'likes', value: '89K' }, { title: 'posts', value: '459' }],
      capBg: { '--cui-card-cap-bg': '#3b5998' },
      labels: [...this.labels],
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [65, 59, 84, 84, 51, 55, 40], label: 'Facebook', ...this.colors }]
      }
    },
    {
      icon: this.icons.cibTwitter,
      values: [{ title: 'followers', value: '973K' }, { title: 'tweets', value: '500' }],
      capBg: { '--cui-card-cap-bg': '#00aced' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [1, 13, 9, 17, 34, 41, 38], label: 'Twitter', ...this.colors }]
      }
    },
    {
      icon: this.icons.cibLinkedin,
      values: [{ title: 'contacts', value: '54789' }, { title: 'posts', value: '1292' }],
      capBg: { '--cui-card-cap-bg': '#4875b4' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [78, 81, 80, 45, 34, 12, 40], label: 'LinkedIn', ...this.colors }]
      }
    },
    {
      icon: this.icons.cilCalendar,
      values: [{ title: 'events', value: '12+' }, { title: 'meetings', value: '4' }],
      color: 'warning',
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [35, 23, 56, 22, 97, 23, 64], label: 'Events', ...this.colors }]
      }
    }
  ];

  capStyle(value: string) {
    return !!value ? { '--cui-card-cap-bg': value } : {};
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
