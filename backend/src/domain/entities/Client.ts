export class Client {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly createdAt: Date,
    public contactName?: string,
    public email?: string,
    public phone?: string
  ) {}
}
