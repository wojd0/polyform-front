import { CreatorState } from "../creator/store/creator.reducer";
import { FormState } from "../form/store/form.reducer";


export interface AppState {
  creator: CreatorState,
  form: FormState
}