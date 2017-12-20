const { DefaultContext, Configuration } = modulinDi;
import E from "./example/E";
import F from "./example/F";

export default {
  [DefaultContext]: {
    [E]: Configuration.module(F)
  }
};
