import { computed } from 'vue';

import { useOptionsStore } from '../../model/OptionsStore';

export function useCustomParam(cartLabel: string) {
  const optionsStore = useOptionsStore();
  return computed({
    get() {
      return optionsStore.mainProduct.customParams[cartLabel];
    },
    set(value: string) {
      optionsStore.mainProduct.customParams[cartLabel] = value;
    },
  });
}
