import { globalRegister } from './register-element'
import { App } from 'vue'
export function registerApp(app: App): void {
  globalRegister(app)
}
