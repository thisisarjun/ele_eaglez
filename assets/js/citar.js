 var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = handres;
  var selob = document.getElementById('city');
  var nsel = document.getElementById('area');
  selob.addEventListener('change', function(event){
    httpRequest.open('POST','/area/deci',true);
    httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    httpRequest.send("id="+selob.options[selob.selectedIndex].value);
  });

  function handres() {
    if(httpRequest.readyState == 4) {
      if(httpRequest.status == 200) {
        console.log('ok got it');
        //alert(httpRequest.responseText[0]);
        removeoption(nsel);
        var obj = JSON.parse(httpRequest.responseText);
        addoption(nsel, obj);
      }
      else {
        console.log('status failed with error code '+ httpRequest.status);
      }
    }
    else {
      console.log('readyState faild with error code '+ httpRequest.readyState);
    }
  }

  function addoption(sobj, jsobj ) {
      for(var i=0; i<jsobj.length;i++) {
        var opt = document.createElement('option');
        opt.value = jsobj[i].name;
        opt.innerHTML = jsobj[i].name;
        sobj.appendChild(opt);
      }
  }

  function removeoption(sobj) {
    for(var i=sobj.options.length - 1; i>=0; i--){
      sobj.remove(i);
    }
  }
