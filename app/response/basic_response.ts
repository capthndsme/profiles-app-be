import { StatusCode } from "../types/StatusCode.js"

export class BasicResponse<T> {
  data: T
  status: StatusCode
  message: string
  error?: boolean

  constructor(data: T, status: StatusCode, message: string, error?: boolean) {
    this.data = data
    this.status = status
    this.message = message
    this.error = error
  }

  toString() {
    return JSON.stringify(this)
  }
}


export class BasicResponseBuilder<T> {
  private data: T
  private status: StatusCode
  private message: string
  private error?: boolean

  constructor() {
    this.data = null as unknown as T
    this.status = 'OKAY'
    this.message = 'SUCCESS'
    this.error = false
  }

  withData(data: T) {
    this.data = data
    return this
  }

  withStatus(status: StatusCode) {
    this.status = status
    return this
  }

  withMessage(message: string) {
    this.message = message
    return this
  }

  withError(error: boolean) {
    this.error = error
    return this
  }

  build() {
    return new BasicResponse(this.data, this.status, this.message, this.error)
  }
}
 