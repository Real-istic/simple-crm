export class Transaction {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  description: string;
  price: number;
  date: string;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.id = obj ? obj.id : '';
    this.description = obj ? obj.description : '';
    this.price = obj ? obj.price : '';
    this.date = obj ? obj.date : '';
  }

  public toJson() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      id: this.id,
      description: this.description,
      price: this.price,
      date: this.date
    };
  }
}
