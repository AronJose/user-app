import { init } from "@rematch/core";
import * as models from '../src/models'

const store = init({ models });

export default store;
