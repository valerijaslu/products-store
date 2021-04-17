import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class GenericHooks implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
