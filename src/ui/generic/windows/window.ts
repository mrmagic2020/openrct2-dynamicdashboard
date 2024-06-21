import {
  TabWindowParams,
  WindowParams,
  WindowTemplate,
  tabwindow,
  window
} from "openrct2-flexui"

class Window<T extends WindowParams | TabWindowParams> {
  protected _windowParams: T
  protected _windowTemplate: WindowTemplate
  protected _isOpen: boolean

  private isTabWindowParams(
    params: WindowParams | TabWindowParams
  ): params is TabWindowParams {
    return (params as TabWindowParams).tabs !== undefined
  }

  constructor(windowParams: T) {
    this._windowParams = windowParams
    if (this.isTabWindowParams(windowParams)) {
      this._windowTemplate = tabwindow(windowParams)
    } else {
      this._windowTemplate = window(windowParams)
    }
    this._isOpen = false
  }

  get windowParams(): T {
    return this._windowParams
  }

  set windowParams(windowParams: T) {
    this._windowParams = windowParams
  }

  open() {
    if (!this._isOpen) {
      this._windowTemplate.open()
      this._isOpen = true
    } else {
      this._windowTemplate.focus()
    }
  }

  close() {
    if (this._isOpen) {
      this._windowTemplate.close()
      this._isOpen = false
    }
  }

  redefine() {
    this.close()
    if (this.isTabWindowParams(this._windowParams)) {
      this._windowTemplate = tabwindow(this._windowParams)
    } else {
      this._windowTemplate = window(this._windowParams)
    }
    this.open()
  }

  setProperties(properties: Partial<WindowParams>) {
    this._windowParams = { ...this._windowParams, ...properties }
  }
}

export default Window
