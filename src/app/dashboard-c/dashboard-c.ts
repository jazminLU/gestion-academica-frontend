import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
import { alumnosService } from '../services/AlumnoService';
import { MateriaService } from '../services/materia-service';
import '@lottiefiles/lottie-player';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-c',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard-c.html',
  styleUrl: './dashboard-c.scss',
})
export class DashboardC implements OnInit, AfterViewInit {

  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef<HTMLCanvasElement>;

  totalAlumnos = 0;
  totalMaterias = 0;

  private labels: string[] = [];
  private counts: number[] = [];
  private dataLoaded = false;
  private viewReady = false;

  constructor(
    private alumnosService: alumnosService,
    private materiaService: MateriaService,
  ) {}

  ngOnInit() {
    forkJoin({
      alumnos: this.alumnosService.getAll(1, 1000),
      materias: this.materiaService.getAll(1, 1000),
    }).subscribe(({ alumnos: alumnosPage, materias: materiasPage }) => {
      const alumnos = alumnosPage.items;
      const materias = materiasPage.items;

      this.totalAlumnos = alumnosPage.totalCount;
      this.totalMaterias = materiasPage.totalCount;

      const countMap = new Map<string, number>();
      materias.forEach(m => countMap.set(m.nombre, 0));
      alumnos.forEach(a => {
        a.materias.forEach(key => {
          countMap.set(key, (countMap.get(key) ?? 0) + 1);
        });
      });

      this.labels = [...countMap.keys()];
      this.counts = [...countMap.values()];
      this.dataLoaded = true;

      if (this.viewReady) this.buildCharts();
    });
  }

  ngAfterViewInit() {
    this.viewReady = true;
    if (this.dataLoaded) this.buildCharts();
  }

  private buildCharts() {
    const colors = ['#5b21b6', '#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#93c5fd'];

    new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Alumnos',
          data: this.counts,
          backgroundColor: colors.slice(0, this.labels.length),
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Alumnos por materia', font: { size: 15 } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
      },
    });

    new Chart(this.doughnutChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.counts,
          backgroundColor: colors.slice(0, this.labels.length),
          hoverOffset: 8,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Distribución por materia', font: { size: 15 } },
          legend: { position: 'bottom' },
        },
      },
    });
  }
}
