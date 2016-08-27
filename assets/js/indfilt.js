//step 1 : declare an instance of XMLHttpRequest.
  var httpRequest = new XMLHttpRequest();
// response handler from server.
  httpRequest.onreadystatechange = reshandler;

//initializing selected object
  var butt = document.getElementById("applybut");
  var checkarray = document.getElementsByClassName('filtbox');
  console.log(checkarray);
  var arr = [];
  var str;
//sending request
  butt.addEventListener('click', function(){
      for(var i=0; i <checkarray.length; i++) {
        if(checkarray[i].checked) {
            arr.push(checkarray[i].value);
            //console.log(checkarray[i].value);
        }
      }
      if(arr) {
        console.log(arr);
        str = arr.join(',');
        console.log(str);
        httpRequest.open('POST','/hotel/indexsearch', true);
        httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        httpRequest.send("cuisine="+str);
        arr = [];
        str = '';
      }
    });
  function reshandler() {
    try {
          if(httpRequest.readyState == 4) {
              if(httpRequest.status == 200) {
                var divcon = document.getElementById('divcon');
                if(divcon.hasChildNodes())
                {
                  removeEle(divcon);
                }
                console.log('ok all set to recieve data');
              //  console.log(httpRequest.responseText);
                var obj = JSON.parse(httpRequest.responseText);
                console.log(obj);
                addEle(obj,divcon);
              }
              else {
                console.log('status not ok with code : ' + httpRequest.status);
              }
          }
          else {
            console.log('readyState not ok with code : ' + httpRequest.readyState);

          }
      } catch(e) {
        console.log(e.message);
      }
  }
  //code snippet to add the required details.
  function addEle(obj, divcon) {
      for(var i=0;i<obj.length; i++) {
        //addition of a
        var a = document.createElement('a');
        a.setAttribute("href",'../user/menuv?id='+obj[i].id);
        a.setAttribute("class",'list-group-item');
        //div media
        var div_media = document.createElement('div');
        div_media.setAttribute("class","media");
        a.appendChild(div_media);
        //span
        var spans = document.createElement('span');
        spans.setAttribute("style",'float:right; margin-top:12px;');
        div_media.appendChild(spans);
        //button inside span
        var menubut = document.createElement('button');
        menubut.setAttribute("class", "btn btn-danger btn-sm");
        //menubut.text = 'View Menu';
        menubut.appendChild(document.createTextNode('View Menu'));
        spans.appendChild(menubut);
        //div to appended to media.
        var div_pulle = document.createElement('div');
        div_pulle.setAttribute("class","pull-left");
        div_media.appendChild(div_pulle);
        //img to be appended to div pull-left
        var imgs = document.createElement('img');
        imgs.setAttribute('class',"media-object");
        imgs.setAttribute('src',"../images/Hotel/"+obj[i].fd);
        imgs.setAttribute('alt',"Image");
        div_pulle.appendChild(imgs);
        //div to be appened to the media div
        var div_mediab = document.createElement('div');
        div_mediab.setAttribute('class','media-body');
        div_media.appendChild(div_mediab);
        //heading class = media-heading to be appended to media-body
        var he = document.createElement('h4');
        he.setAttribute('class','media-heading');
        he.appendChild(document.createTextNode(obj[i].hname));
        div_mediab.appendChild(he);
        //p tags to be included in under media-body
        var p1 = document.createElement('p');
        p1.appendChild(document.createTextNode(obj[i].address));
        var p2 = document.createElement('p');
        p1.appendChild(document.createTextNode(obj[i].city));
        var p3 = document.createElement('p');
        p1.appendChild(document.createTextNode(obj[i].pin));
        div_mediab.appendChild(p1);
        div_mediab.appendChild(p2);
        div_mediab.appendChild(p3);

        //main div under which everything else comes
        divcon.appendChild(a);

      }
    }

//code snippet to remove the required details
function removeEle(parentdiv) {
    while(parentdiv.lastChild) {
      parentdiv.removeChild(parentdiv.lastChild);
    }
  }
