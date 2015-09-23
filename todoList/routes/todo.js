
import express from 'express'
import Todo    from '../model/todo.js'

let router  = express.Router();
let debug   = require('debug')('API:todo');

/* [POST] 新增一筆todo
 * input  : job
 * output : id, job, status
 */
router.post('/', (req, res, next) => {

  // create
  Todo.sync( { force: false } )
      .then( () => {

        return Todo.create({
          job: req.body.job,
          status: 0,
          del: 0
        });
      })
      .then( result => {

        debug('[PUT] 新增一筆todo, success', result.dataValues );
        res.json( { data: result.dataValues } );
      })
      .catch( err => {

        debug('[PUT] 新增一筆todo, fail', err );
        next(err);
      });
});

/* [GET] 取得所有todo
 *
 */
router.get('/', (req, res, next) => {

  Todo.findAll({ where: {
          del: 0
        }
      })
      .then( result => {

        debug('[PUT] 取得所有todo, success', result );
        res.json( { data: result } );
      })
      .catch( err => {

        debug('[PUT] 取得所有todo, fail', err );
        next(err);
      });
});

/* [GET] 取得完成/未完成的todo
 *
 */
router.get('/:status', (req, res, next) => {

  let status = parseInt( req.params.status );

  if(status === 0) status = false;
  else status = true;

  Todo.findAll({ where: {
          del: 0,
          status: true
        }
      })
      .then( result => {

        debug('[PUT] 取得完成/未完成 todo, success', result );
        res.json( { data: result } );
      })
      .catch( err => {

        debug('[PUT] 取得完成/未完成 todo, fail', err );
        next(err);
      });
});

/* [PUT] 修改一筆todo資料
 * input: todoId + info
 */
router.put('/', (req, res, next) => {

  res.end();
});

/* [DELETE] 刪除(註銷)一筆todo
 * input: todoId
 */
router.put('/', (req, res, next) => {

  res.end();
});


module.exports = router;
