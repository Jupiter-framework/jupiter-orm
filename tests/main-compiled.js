'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _orm = require('../orm');

var _ormInterface = require('../orm-interface');

var _ormInterface2 = _interopRequireDefault(_ormInterface);

describe('ORM', function () {
    describe('orm module', function () {

        it('must have API functions', function () {
            [_orm.typeRegister, _orm.Fabric, _orm.getType].forEach(function (func) {
                (0, _chai.expect)(func).to.be.ok.and.to.be.a('function');
            });
        });

        it('registerType should return true on success', function () {
            (0, _chai.expect)((0, _orm.typeRegister)('name', {})).to.be.ok.and.eql(true);
        });

        it('Object written to registry by name, should be accessible by name through getType()', function () {
            var testObj = { prop: true };
            (0, _orm.typeRegister)('test', testObj);

            (0, _chai.expect)((0, _orm.getType)('test')).to.be.eql(testObj);
        });

        it('Fabric should return object of registered type with 2 methods: query() and exec()', function () {
            (0, _orm.typeRegister)('test', _ormInterface2['default']);
            var testSubject = (0, _orm.Fabric)('test', { opts: true });

            (0, _chai.expect)(testSubject.query).to.be.ok.and.to.be.a('function');
            (0, _chai.expect)(testSubject.exec).to.be.ok.and.to.be.a('function');
        });
    });

    describe('orm interface module', function () {

        it('Module object should have method getOrm()', function () {
            (0, _chai.expect)(_ormInterface2['default'].getOrm).to.be.ok.and.be.a('function');
        });

        it('Method getOrm() should return object with 2 methods: query() and exec()', function () {
            (0, _chai.expect)(_ormInterface2['default'].getOrm({}).query).to.be.ok.and.to.be.a('function');
            (0, _chai.expect)(_ormInterface2['default'].getOrm({}).exec).to.be.ok.and.to.be.a('function');
        });

        it('ORM object\'s method query() should return adapter object with API methods', function () {
            var testSubject = _ormInterface2['default'].getOrm({}).query();

            (0, _chai.expect)(testSubject.setCollection).to.be.ok.and.to.be.a('function');
            (0, _chai.expect)(testSubject.where).to.be.ok.and.to.be.a('function');
            (0, _chai.expect)(testSubject.order).to.be.ok.and.to.be.a('function');
            (0, _chai.expect)(testSubject.limit).to.be.ok.and.to.be.a('function');
            (0, _chai.expect)(testSubject.exec).to.be.ok.and.to.be.a('function');
        });

        it('ORM object\'s method exec() should return promise', function () {
            var testSubject = _ormInterface2['default'].getOrm({});

            (0, _assert2['default'])(true, testSubject.exec().resolve);
            (0, _assert2['default'])(true, testSubject.query().exec().resolve);
        });

        it('Adapter objects API methods, except exec() should return itself for chainability', function () {
            var testSubject = _ormInterface2['default'].getOrm({}).query();

            (0, _chai.expect)(testSubject.setCollection()).to.be.ok.and.be.eql(testSubject);
            (0, _chai.expect)(testSubject.where()).to.be.ok.and.be.eql(testSubject);
            (0, _chai.expect)(testSubject.order()).to.be.ok.and.be.eql(testSubject);
            (0, _chai.expect)(testSubject.limit()).to.be.ok.and.be.eql(testSubject);
        });
    });
});

//# sourceMappingURL=main-compiled.js.map