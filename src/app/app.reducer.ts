import { creatorReducer, CreatorState } from "./creator/store/creator.reducer";
import { formReducer, FormState } from "./submission/store/form.reducer";
import { resultsReducer, ResultsState } from "./results/store/results.reducer";


export interface AppState {
  creator: CreatorState,
  form: FormState,
  results: ResultsState
}

export const reducerModel = {
  creator: creatorReducer,
  form: formReducer,
  results: resultsReducer
}