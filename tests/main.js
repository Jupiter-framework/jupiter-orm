import { expect } from 'chai';
import promiseES6 from 'es6-promise';
import assert from 'assert';

import { typeRegister, Fabric, getType } from '../orm';
import ormInterface from '../orm-interface';

describe('ORM' , function(){
    describe('orm module', function(){

        it('must have API functions', function(){
            [typeRegister, Fabric, getType].forEach(function(func){
                expect(func).to.be.ok.and.to.be.a('function');
            });
        });

        it('registerType should return true on success', function(){
            expect(typeRegister('name', {})).to.be.ok.and.eql(true);
        });

        it('Object written to registry by name, should be accessible by name through getType()', function(){
            let testObj = {prop: true};
            typeRegister('test', testObj);

            expect(getType('test')).to.be.eql(testObj);
        });

        it('Fabric should return object of registered type with 2 methods: query() and exec()', function(){
            typeRegister('test', ormInterface);
            let testSubject = Fabric('test', {opts: true});

            expect(testSubject.query).to.be.ok.and.to.be.a('function');
            expect(testSubject.exec).to.be.ok.and.to.be.a('function');
        });
    });

    describe('orm interface module', function() {

        it('Module object should have method getOrm()', function () {
            expect(ormInterface.getOrm).to.be.ok.and.be.a('function');
        });

        it('Method getOrm() should return object with 2 methods: query() and exec()', function () {
            expect(ormInterface.getOrm({}).query).to.be.ok.and.to.be.a('function');
            expect(ormInterface.getOrm({}).exec).to.be.ok.and.to.be.a('function');
        });

        it('ORM object\'s method query() should return adapter object with API methods' , function () {
            let testSubject = ormInterface.getOrm({}).query();

            expect(testSubject.setCollection).to.be.ok.and.to.be.a('function');
            expect(testSubject.where).to.be.ok.and.to.be.a('function');
            expect(testSubject.order).to.be.ok.and.to.be.a('function');
            expect(testSubject.limit).to.be.ok.and.to.be.a('function');
            expect(testSubject.exec).to.be.ok.and.to.be.a('function');
        });

        it('ORM object\'s method exec() should return promise', function () {
            let testSubject = ormInterface.getOrm({});

            assert(true, testSubject.exec().resolve);
            assert(true, testSubject.query().exec().resolve);
        });

        it('Adapter objects API methods, except exec() should return itself for chainability', function () {
            let testSubject = ormInterface.getOrm({}).query();

            expect(testSubject.setCollection()).to.be.ok.and.be.eql(testSubject);
            expect(testSubject.where()).to.be.ok.and.be.eql(testSubject);
            expect(testSubject.order()).to.be.ok.and.be.eql(testSubject);
            expect(testSubject.limit()).to.be.ok.and.be.eql(testSubject);
        });
    });
});