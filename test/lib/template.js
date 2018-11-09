module.exports = {
  // HTML:function(title, list_buildings, list_courses, submit){
  HTML:function(title, submit){
    return `
    <!doctype html>
    <html>
    <head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <title>강의실검색 - ${title}</title>
      <meta charset="utf-8">

        <!--아래 코드에는 구글 인증과 관련된 복잡한 처리를 대신해주는 코드가 안에 들어가 있음-->
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <!--나의 client ID값을 content에 넣어줌-->
        <meta name="google-signin-client_id" content="405776101343-sd39jsr3tij51rghu7ulm3ihs4cv1med.apps.googleusercontent.com">

        <script>
        function onSignIn(googleUser) {//사용자의 프로필정보를 얻어오는 함수ㅇㅇ
          var profile = googleUser.getBasicProfile();
          console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
          console.log('Name: ' + profile.getName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        }
        </script>
        
    </head>
    <body>
      <!--구글로그인 버튼을 이용하기위함
      data-onsuccess="onSignIn"는 로그인에 성공했을 경우, onSinghIn이라는 함수를 만들어 놓았을 경우
      그 함수를 구글sdk가 호출할 것임!!!!(위에 함수코드 복사해와서 붙여놨음)
      -->
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
          
        <h1><a href="/">강의실 검색</a></h1>
        
        ${submit}
        
      
    </body>
    </html>
    `;
  },list_buildings_courses:function(buildings){
    var buildingoption = '';
    var i = 0;

      while(i < buildings.length){
        //디비에 있는 building_name들을 while문을 이용하여 select의 option으로 넣는 문장!!
        buildingoption += `<option>${buildings[i].building_name}</option>` 
        i++;
      }

      return `

      <select name="list_buildings" id="select1" onchange="itemChange()">
        ${buildingoption}
      </select>

      <select id="select2" name="list_courses">
        <option>default_test</option>
      </select>

      <script>

        function itemChange(){
          
        
          ${this.each_Building_courses_arrary()};

          // var selectItem = $("#select1").val();
          //document.getElementById("demo").append(selectItem);//////////////확인용!!

          var selectItem = document.getElementById("select1").value;
          
          var changeItem;

          ${this.changeItem_match()};
          
          $('#select2').empty();

          for(var count = 0; count < changeItem.length; count++){
                          var option = "<option>"+changeItem[count]+"</option>";
                          $('#select2').append(option);
                      }
          }

        </script>
        
        

        <p id="demo"></p>
      `

  },selected_list_buildings_courses:function(buildings, posted_list_buildings, posted_list_courses){

    var buildingoption = '';
    var i = 0;

      while(i < buildings.length){
        //selected를 위한 if문!!!!
        var selected = '';
        if(buildings[i].building_name === posted_list_buildings) {
          selected = ' selected';
        }
        //디비에 있는 building_name들을 while문을 이용하여 select의 option으로 넣는 문장!!
        buildingoption += `<option ${selected}>${buildings[i].building_name}</option>` 
        i++;
      }

      return `
      <select name="list_buildings" id="select333" onchange="itemChange()">
        ${buildingoption}
      </select>

      <select id="select444" name="list_courses">
          <option>${posted_list_courses}</option>
        </select>

        
      <p id="demo"></p>

      <script>
        
        function itemChange(){
          
          ${this.each_Building_courses_arrary()};

          var selectItem = document.getElementById("select333").value;
          
          var changeItem;

          ${this.changeItem_match()};

          $('#select444').empty();

          for(var count = 0; count < changeItem.length; count++){
            var option = "<option>"+changeItem[count]+"</option>";
            $('#select444').append(option);
          }
        }

        </script>

      
      `

  },each_Building_courses_arrary:function(){
    //각 건물의 강의실 갯수만큼!!!!!!
    var tag = ``;
    tag += `
    var kong1 = [];
    var kong2 = [];
    var kong5 = ["404","405","410","411","412","413","414","415","416"];
    `;

    return tag;
    
  },changeItem_match:function(){
    //건물 갯수만큼!!!!!!
    var tag = ``;
    tag += `
    if(selectItem == "공1"){
      changeItem = kong1;
    }
    else if(selectItem == "공2"){
      changeItem = kong2;
    }
    else if(selectItem == "공5"){
      changeItem = kong5;
    }
  `;

    return tag;
    
  }
  
  
  
  
  ,authorTable:function(result){

    var tag = '<table';

    if(result == ''){
      tag += ' style="width:100%"> <tr align="center"><td width="10%">교시</td><td width="15%">월</td><td width="15%">화</td><td width="15%">수</td><td width="15%">목</td><td width="15%">금</td></tr>';
    }
    else{
      tag += ' style="width:100%"> <tr align="center"><td width="10%">교시</td><td width="15%">월</td><td width="15%">화</td><td width="15%">수</td><td width="15%">목</td><td width="15%">금</td></tr>';
      var i = 0;
      while(i < result.length){
          tag += `
              <tr>
                  <td width="10%">${result[i].교시}</td>
                  <td width="15%">${result[i].월}</td>
                  <td width="15%">${result[i].화}</td>
                  <td width="15%">${result[i].수}</td>
                  <td width="15%">${result[i].목}</td>
                  <td width="15%">${result[i].금}</td>
              </tr>
              `
          i++;
      }
    }
   
    tag += '</table>';
    return tag;

  }
}
