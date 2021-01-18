export class User {
  // tslint:disable-next-line:variable-name
  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {
  }


  get token(): string | null {
    if (this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }
}
