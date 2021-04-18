import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit, OnDestroy {

  public title: string = '';

  // private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.getTitle$.subscribe(title => {
      this.title = title;
      this.cdRef.detectChanges();
    })
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
