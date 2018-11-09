//지울꺼지우기!!
var http = require('http');
var fs = require('fs');
var url = require('url');//url모듈!!
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');//mysql의 이름으로 mysql모듈을 가져옴!!

//가져온 mysql모듈에 접속을 하고, 
//이를 자주 사용하기위해 db라는 변수에 넣어놈
var db = mysql.createConnection({ 
  host     : 'localhost',
  user     : 'root',
  password : 'mysql4665',
///////////////////////////////////여기서부터 바꿈시작ㅎㅎㅎㅎ
  database : 'test'
});
//실제 접속!!
db.connect();

var app = http.createServer(function(request,response){
    var _url = request.url; //url모듈 사용하지않음 아직ㅎㅎ
                            //이 값은 /?id=HTML이런식인 쿼리스트링임!!
    var queryData = url.parse(_url, true).query; //url모듈을 사용하여 parse하여
                                    //{id: 'HTML'}이런식의 쿼리스트링 객체들이 나옴
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){ //최상위 경로이면!!의 뜻임
      if(queryData.id === undefined){ //쿼리스트링 객체 하나안의 id값만 나오도록!!
        
        db.query('SELECT * FROM building',function (error, buildings) {
          db.query('SELECT * FROM course',function (error, courses){

            var title = 'Welcome';
            
            var html = template.HTML(title,
              `
                <form action="/submit_process" method="post">
                  ${template.list_buildings_courses(buildings)}
                  <input type="submit">
                </form>
              `
            );
            
            response.writeHead(200);
            response.end(html);
          })          
        });


      } else {}
    }
    
    
    
    
    else if(pathname === '/submit_process'){//////////////////////////////////////////
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);

          console.log(post);

          db.query('SELECT * FROM building',function (error, buildings) {
            //여기도 에러 예외처리 다해주기!!!!!!!!!!!!!!!!!!!ㅋㅋ
            db.query('SELECT * FROM course',function (error2, courses){
              //여기도 에러 예외처리 다해주기!!!!!!!!!!!!!!!!!!!
              db.query(`select * from (           select * from 공5_404 
                                        union all select * from 공5_405
                                        union all select * from 공5_410
                                        union all select * from 공5_411
                                        union all select * from 공5_412
                                        union all select * from 공5_413
                                        union all select * from 공5_414
                                        union all select * from 공5_415
                                        union all select * from 공5_416
                                      )
              as U where U.building_name=? and U.course_name=?;`,[post.list_buildings,post.list_courses]
              ,function(error3, result){
                if(error3){
                  throw error3;
                }
                
                //console.log(result);//다 하면 지워도 됨ㅇㅇ

                var title = 'Welcome';
               
                var html = template.HTML(title,
                  `
                    <form action="/submit_process" method="post">
                      ${template.selected_list_buildings_courses(buildings, post.list_buildings, post.list_courses)}
                      <input type="submit">

                      ${template.authorTable(result)}
                      
                    </form>

                    <style>
                        table{ border-collapse: collapse; }
                        td{ border:1px solid black; }
                    </style>
                  `
                );

                response.writeHead(200);
                response.end(html);
              })          
            });



              }
            )


      });


    }





    else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
