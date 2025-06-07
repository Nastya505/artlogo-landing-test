import { useUrlSearchParams } from '@vueuse/core';
import { defineStore } from 'pinia';

/**
 * Store to manage the URL query params for the product options.
 *
 * This store is required to share URL Params state between multiple components.
 */
export const useQueryParamsStore = defineStore('url-query-params-store', () => {
  const params = useUrlSearchParams('history');

  function get(key: string) {
    return params[key];
  }

  function set(key: string, value: string) {
    params[key] = value;
  }

  function del(key: string) {
    delete params[key];
  };

  return {
    get,
    set,
    del,
  };
});
