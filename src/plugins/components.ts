const modules = import.meta.glob('../components/*.vue')

export default {
  install(app) {
    Object.keys(modules).forEach(componentPath => {
      let curComponent = modules[componentPath]
      app.component(curComponent.name, curComponent)
    })
  },
}
