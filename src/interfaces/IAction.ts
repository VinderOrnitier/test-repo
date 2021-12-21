export default interface IAction {
  type: string
  payload?: object | string | number
  error?: any
}