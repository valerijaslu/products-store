import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  public title: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbService.getTitle$.subscribe(title => {
      this.title = title;
      this.cdRef.detectChanges();
    })
  }

}
