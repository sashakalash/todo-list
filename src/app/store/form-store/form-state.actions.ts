export enum FormActionsTypes {
  STATUS_CHANGED = '[Form] Form Status`s been Changed',
}

export namespace FormActions {
  export class TouchedStatusChanged {
    static readonly type = FormActionsTypes.STATUS_CHANGED;
    constructor(public payload: boolean) {}
  }
}
