import { Selector } from '@ngxs/store';
import { FormState, FormStateModel } from './form.state';

export class FormStateSelectors {

  @Selector([FormState])
  static selectTouchedStatus(state: FormStateModel): boolean {
    return state.touched;
  }
}
