import { Action, createReducer, on } from "@ngrx/store";
import { FormModel } from "src/app/shared/models/form.model";
import QuestionModel from "src/app/shared/models/question.model";

import * as FormActions from "./form.actions";

export const formFeatureKey = "form";

export interface FormState {
  questions: QuestionModel[];
  form: FormModel;
  done: boolean;
  errorMsg: string;
  errorId: string;
}

export const initialState: FormState = {
  done: false,
  errorMsg: null,
  form: null,
  questions: [],
  errorId: null
};

export const formReducer = createReducer(
  initialState,

  //retrieve
  on(FormActions.retrieveStart, (state) => ({
    ...state,
    errorMsg: "",
    form: null,
    questions: [],
    done: false
  })),

  on(FormActions.retrieveSuccess, (state, action) => ({
    ...state,
    done: true,
    form: action.form,
    questions: action.questions,
  })),

  on(FormActions.retrieveFailure, (state, action) => ({
    ...state,
    errorMsg: action.error,
    errorId: action.id,
    done: true
  })),

  on(FormActions.acknowledge, (state) => ({
    ...state,
    errorMsg: null,
    errorId: null
  })),

  //send results

  on(FormActions.sendStart, (state) => ({
    ...state,
    errorMsg: null,
    errorId: null
  })),

  on(FormActions.sendFailure, (state, action) => ({
    ...state,
    errorMsg: action.error,

  })),
);
