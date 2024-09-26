export default class User {
  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private _active: boolean = true,
    private _id?: string
  ) {}

  get id(): string | undefined {
    return this._id
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  get active() {
    return this._active
  }

  set password(password: string) {
    this._password = password
  }
}
