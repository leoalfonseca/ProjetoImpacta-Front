import { INSTANCE_KEY, SELECTED_INSTANCE_KEY } from './storageConfig';

const storageGetInstance = () => localStorage.getItem(INSTANCE_KEY);

const storageSetInstance = (instance: string) =>
  localStorage.setItem(INSTANCE_KEY, instance);

const storageRemoveInstance = async () => {
  localStorage.removeItem(INSTANCE_KEY);
};

const storageGetInstanceSelected = () =>
  localStorage.getItem(SELECTED_INSTANCE_KEY);

const storageSetInstanceSelected = (instance: string) =>
  localStorage.setItem(SELECTED_INSTANCE_KEY, instance);

const storageRemoveInstanceSelected = async () => {
  localStorage.removeItem(SELECTED_INSTANCE_KEY);
};

export {
  storageGetInstance,
  storageGetInstanceSelected,
  storageRemoveInstance,
  storageRemoveInstanceSelected,
  storageSetInstance,
  storageSetInstanceSelected,
};
