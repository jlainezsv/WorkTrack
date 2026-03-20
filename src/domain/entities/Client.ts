export class Client {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly createdAt: Date = new Date(),
    public contactName?: string,
    public email?: string,
    public phone?: string
  ) {
    if (!id) throw new Error("Client id is required")
    if (!name) throw new Error("Client name is required")
  }
}
