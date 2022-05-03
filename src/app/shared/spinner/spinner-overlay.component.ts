import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { SpinnerOverlayService } from './spinner-overlay.service';
import { map, startWith, tap } from 'rxjs/operators';

export const GENERIC_SPINNER_TITLE = 'Processing... please wait';

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerOverlayComponent {
  title = this.spinnerService.spinningEvents.pipe(
    tap(spinningEvent => {
      this.hidden = !spinningEvent.spinning;
    }),
    map(spinningEvent => spinningEvent.title),
    map(title => title || GENERIC_SPINNER_TITLE),
    startWith(GENERIC_SPINNER_TITLE)
  );

  @HostBinding('class.hidden') hidden = true;

  constructor(private spinnerService: SpinnerOverlayService) {}
}
