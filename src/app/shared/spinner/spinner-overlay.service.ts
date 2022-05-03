import { of, Subject, TimeInterval, timer } from 'rxjs';
import {
  distinctUntilChanged,
  mapTo,
  publishReplay,
  refCount,
  startWith,
  switchMap,
  timeInterval
} from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface SpinningEvent {
  spinning: boolean;
  title: string;
}

export const SHOW_TIME = 1000;

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  private spinnerEventSubject = new Subject<SpinningEvent>();
  private spinningRequests = 0;
  private title: string = undefined;

  private spinningForMinimumConfiguredAmountOfTime = this.spinnerEventSubject.pipe(
    distinctUntilChanged(),
    timeInterval(),
    switchMap((x: TimeInterval<SpinningEvent>) => {
      const timeLeft = Math.max(SHOW_TIME - x.interval, 0);
      return x.value.spinning
        ? of(this.getSpinningEvent(true))
        : timer(timeLeft).pipe(mapTo(this.getSpinningEvent(false)));
    }),
    startWith(this.getSpinningEvent()),
    publishReplay(1),
    refCount()
  );

  get spinningEvents() {
    return this.spinningForMinimumConfiguredAmountOfTime;
  }

  startSpinning() {
    this.spinningRequests++;

    if (this.spinningRequests === 1) {
      this.spinnerEventSubject.next(this.getSpinningEvent(true));
    }
  }

  stopSpinning() {
    this.spinningRequests--;

    if (this.spinningRequests === 0) {
      this.spinnerEventSubject.next(this.getSpinningEvent(false));
    }

    if (this.spinningRequests < 0) {
      throw new Error('Spinner stop spinning called too many times');
    }
  }

  overrideTitle(title: string): void {
    this.title = title;
  }

  restoreDefaultTitle(): void {
    this.title = undefined;
  }

  private getSpinningEvent(spinning?: boolean) {
    return {
      spinning: spinning !== undefined ? spinning : this.spinningRequests > 0,
      title: this.title
    };
  }
}
