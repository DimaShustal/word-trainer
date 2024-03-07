import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import AppStore from '../AppStore';
import { NewAlert, QueueAlert } from '../../types/Alert';

class Alerts {
  stack: QueueAlert[] = [];

  constructor(private store: AppStore) {
    makeAutoObservable(this);
  }

  addAlert = (alert: NewAlert): void => {
    this.stack = [{ ...alert, id: uuidv4() }, ...this.stack];
  };

  closeAlert = (id: string): void => {
    this.stack = this.stack.filter(alert => alert.id !== id);
  };
}

export default Alerts;
