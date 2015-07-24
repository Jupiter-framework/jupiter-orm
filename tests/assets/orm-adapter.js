
import stub from 'sinon';
import { Promise } from 'es6-promise';

export function Fabric(options) {
  let adapter = {};
  let query = {};

  const execute = stub.stub();
  execute.returns(new Promise(function(resolve){ resolve(); }));

  query.setCollection = stub.stub();
  query.setCollection.returnsThis();

  query.where = stub.stub();
  query.where.returnsThis();

  query.order = stub.stub();
  query.order.returnsThis();

  query.limit = stub.stub();
  query.limit.returnsThis();

  query.exec = execute;

  adapter.query = stub.stub();
  adapter.query.returns(query);

  adapter.exec = execute;

  return adapter;
}
export default {
  Fabric
}
