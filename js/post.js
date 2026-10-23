var start = "";
var loaded = false;
function callAjax(c, b) {
      var a = new XMLHttpRequest;
      a.onreadystatechange = function() {
          4 == a.readyState && 200 == a.status && b(JSON.parse(a.responseText))
      };
      a.open("GET", c, !0);
      a.send()
  }
  function getLocation(end) {
    var c = "/timetable/"+encodeURI(start + ' 에서 '+end+' 가는 비행기 시간표')+"/";
    location.href = c;

  }
  function detail(a) {
    start = a;
    callAjax("/json/"+encodeURI(a)+".json", function(arr){
        var resultArr = [];
        for (var i=0; i<arr.length; i++) {
          var row = arr[i];
          resultArr.push('<a href="javascript:;" onclick="getLocation(\''+row+'\');" class="list-group-item list-group-item-action">'+row+'</a>');
        }
        
        document.getElementById('detail').innerHTML = resultArr.join('');
    });
  }
function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                if (callback && typeof callback === "function") {
                    callback();
                }
            }
        };
    }
    else {
        script.onload = function () {
            if (callback && typeof callback === "function") {
                callback();
            }
        };
    }
    script.src = url;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
}

loadScript('https://code.jquery.com/jquery-3.6.0.min.js', function(){
    $(document).ready(function(){
      var myModalEl = document.getElementById('modal')
      myModalEl.addEventListener('show.bs.modal', function (event) {
        callAjax("/json/master.json", function(arr){
          var resultArr = [];
          for (var i=0; i<arr.length; i++) {
            var row = arr[i];
            resultArr.push('<a href="javascript:;" onclick="detail(\''+row+'\');" class="list-group-item list-group-item-action">'+row+'</a>');
          }

          document.getElementById('master').innerHTML = resultArr.join('');
        });
      });
      myModalEl.addEventListener('shown.bs.modal', function (event) {
        console.log('shown.bs.modal');
      });
      myModalEl.addEventListener('hide.bs.modal', function (event) {
        console.log('hide.bs.modal');
      });
      myModalEl.addEventListener('hidden.bs.modal', function (event) {
        console.log('hidden.bs.modal');
      });
    });
});
