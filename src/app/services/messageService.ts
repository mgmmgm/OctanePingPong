import {Subject} from 'rxjs';

class MessageService {

    message;

    constructor() {
        this.message = new Subject();
    }
}

export default new MessageService();
