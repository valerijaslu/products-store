import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BreadcrumbService } from '../../services/breadcrumb.service';


@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit, OnDestroy {

  public title: string = '';
  private readonly destroy$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.getTitle$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(title => {
      this.title = title;
      this.cdRef.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
