import Logger from "../utils/logger"
import Exporter from "./exporter"

namespace Server {
  let server: Listener
  export function init() {
    server = network.createListener()
    server.on("connection", (socket) => {
      socket.on("data", (data) => {
        Logger.debug(`Received data: ${data}`)
        if (Exporter.validateKey(data)) {
          const response = Exporter.exportData<number>(data as RequestKey)
          if (response) {
            Logger.debug(`Sending response: ${response.toString()}`)
            socket.write(response.toString())
          } else {
            Logger.debug(`Response is undefined: ${data}`)
          }
        } else {
          Logger.debug(`Invalid key: ${data}`)
        }
      })
      socket.on("error", (error) => {
        Logger.error(`Socket error: ${error}`)
      })
      socket.on("close", () => {
        Logger.debug("Socket closed")
      })
    })

    server.listen(8080, "localhost")
  }
}

export default Server
