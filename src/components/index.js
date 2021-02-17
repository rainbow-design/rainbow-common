export { default as Loading } from './loading';
export { default as Toast } from './toast';
export * from './overlay';

export function registerComponents(Vue, components) {
  if (components && components.length > 0) {
    components.forEach((component) => {
      if (component.install) {
        component.install(Vue);
      } else if (component.name) {
        Vue.component(component.name, component);
      }
    });
  }
}
