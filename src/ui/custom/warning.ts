import {
  Bindable,
  Colour,
  WindowTemplate,
  button,
  horizontal,
  label,
  window
} from "openrct2-flexui"

interface WarningWindowParams {
  title: Bindable<string>
  message: Bindable<string>
  confirmButton: Bindable<string>
  cancelButton: Bindable<string>
  onConfirm?: () => void
  onCancel?: () => void
}

class WarningWindow {
  private static readonly DEFAULT_CONFIRM_TEXT: string = "Confirm"
  private static readonly DEFAULT_CANCEL_TEXT: string = "Cancel"

  private window: WindowTemplate

  constructor(params: WarningWindowParams) {
    this.window = window({
      title: params.title,
      width: 200,
      height: 100,
      position: "center",
      colours: [Colour.BordeauxRed, Colour.SaturatedRed],
      content: [
        label({
          text: params.message,
          alignment: "centred",
          padding: { top: 10 }
        }),
        horizontal({
          padding: { top: 30 },
          content: [
            button({
              height: 15,
              text: params.cancelButton || WarningWindow.DEFAULT_CANCEL_TEXT,
              onClick: () => {
                if (typeof params.onCancel !== "undefined") {
                  params.onCancel()
                }
                this.window.close()
              }
            }),
            button({
              height: 15,
              text: params.confirmButton || WarningWindow.DEFAULT_CONFIRM_TEXT,
              onClick: () => {
                if (typeof params.onConfirm !== "undefined") {
                  params.onConfirm()
                }
                this.window.close()
              }
            })
          ]
        })
      ]
    })
  }

  public static show(params: WarningWindowParams): WarningWindow {
    const warning = new WarningWindow(params)
    warning.window.open()
    return warning
  }
}

export default WarningWindow
