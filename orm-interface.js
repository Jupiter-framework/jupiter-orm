import stub from 'sinon';
import promiseES6 from 'es6-promise';

export default{
    getOrm: function (options) {
        let OrmInterface = function () {
            let adapter = {};

            adapter.setCollection = stub.stub();
            adapter.setCollection.returnsThis();

            adapter.where = stub.stub();
            adapter.where.returnsThis();

            adapter.order = stub.stub();
            adapter.order.returnsThis();

            adapter.limit = stub.stub();
            adapter.limit.returnsThis();

            adapter.exec = stub.stub();
            adapter.exec.returns(new promiseES6.Promise(function(){}));

            this.query = stub.stub();
            this.query.returns(adapter);

            this.exec = stub.stub();
            this.exec.returns(new promiseES6.Promise(function(){}));
        };

        return new OrmInterface();
    }
}