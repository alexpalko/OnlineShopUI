import { Role } from './role';
import { Order } from './order';

export class Customer {
    constructor(
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public roles: Role[],
        public orders: Order[]
    ){}
}
