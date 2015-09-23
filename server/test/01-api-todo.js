var request = require('request');
var debug   = require('debug')('TEST:todo');

//init data
var initData = {
    job: '測試工作'
};

describe('[ (01) API unit test - users ]', () => {

    // before( done => {
    //     return done();
    // });

    describe('正常操作測試', () => {

        it('[POST] 新增 todo ', done => {

            request({
                url: 'http://localhost:8080/api/todo/',
                method: 'POST',
                json: true,
                form: initData
            }, (err, res, result) => {

                let data = result.data;

                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                data.should.have.property('id');
                data.should.have.property('job', initData.job);
                data.should.have.property('status', false);

                initData.id = data.id;

                return done();
            });
        });

        it('[GET] 查詢 todo (1) all', done => {

            request({
                url: 'http://localhost:8080/api/todo/',
                method: 'GET',
                json: true,
                // form: { uid: uid }
            }, (err, res, result) => {

                let data = result.data;

                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                data.forEach( val => {
                    val.should.have.property('id');
                    val.should.have.property('job');
                    val.should.have.property('status');
                    val.should.have.property('del', false);
                });

                return done();
            });
        });

        it('[GET] 查詢未完成 todo (2) 未完成 status = 0', done => {

            request({
                url: 'http://localhost:8080/api/todo/0',
                method: 'GET',
                json: true,
                // form: { uid: uid }
            }, (err, res, result) => {

                let data = result.data || [];

                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                data.forEach( val => {
                    val.should.have.property('id');
                    val.should.have.property('job');
                    val.should.have.property('status', false);
                    val.should.have.property('del', false);
                });

                return done();
            });
        });

        it('[GET] 查詢未完成 todo (2) 已完成 status = 1', done => {

            request({
                url: 'http://localhost:8080/api/todo/1',
                method: 'GET',
                json: true,
                // form: { uid: uid }
            }, (err, res, result) => {

                let data = result.data || [];

                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                data.forEach( val => {
                    val.should.have.property('id');
                    val.should.have.property('job');
                    val.should.have.property('status', true);
                    val.should.have.property('del', false);
                });

                return done();
            });
        });

        it('[PUT] 修改 todo ', done => {

            let newJob = { id: initData.id, job: '測試工作(修改)' };

            request({
                url: 'http://localhost:8080/api/todo/',
                method: 'PUT',
                json: true,
                form: newJob
            }, (err, res, result) => {

                console.log('data', data)

                let data = result.data;

                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                data.forEach( val => {
                    val.should.have.property('id', newJob.id);
                    val.should.have.property('job', newJob.job);
                    val.should.have.property('status');
                    val.should.have.property('del', false);
                });

                return done();
            });
        });

        // it('[DELETE] 刪除 todo ', done => {

        //     request({
        //         url: 'http://localhost:8080/api/todo/',
        //         method: 'DELETE',
        //         json: true,
        //         // form: { uid: uid }
        //     }, (err, res, data) => {

        //         return done();
        //     });
        // });
    });

    after( done => {
        return done();
    });
});
