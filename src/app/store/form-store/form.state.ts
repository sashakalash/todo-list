import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { patch} from '@ngxs/store/operators';
import { FormActions } from './form-state.actions';

const FORM_STATE_TOKEN = new StateToken<FormStateModel>('form');

export interface FormStateModel {
  touched: boolean;
}

@State<FormStateModel>({
  name: FORM_STATE_TOKEN,
  defaults: {
    touched: false
  }
})

@Injectable()
export class FormState {
  @Action(FormActions.TouchedStatusChanged)
  setFormTouchedStatus(ctx: StateContext<FormStateModel>, { payload }: FormActions.TouchedStatusChanged): void {
    ctx.setState(patch({
      touched: payload
    }));
  }
}
