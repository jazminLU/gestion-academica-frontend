import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
import { alumnosService } from '../services/AlumnoService';
import { MateriaService } from '../services/materia-service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-c',
  standalone: true,
  imports: [CommonModule],
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
    const colors = ['#1976d2', '#42a5f5', '#1565c0', '#90caf9', '#bbdefb', '#0d47a1'];

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
